import { Injectable, Inject } from '@nestjs/common';
import type { IAuthSessionRepository } from '../../domain/repositories/auth-session.repository';
import { AUTH_SESSION_REPOSITORY } from '../../domain/repositories/auth-session.repository';
import { PasswordService } from '../../domain/services/password.service';
import { TokenService } from '../../domain/services/token.service';
import { ConfigService } from '@nestjs/config';
import { USER_REPOSITORY } from '../../../user/domain/repositories/user.repository';
import type { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { LoginDto } from '../../interfaces/dtos/login.dto';
import { RefreshHashService } from '../../domain/services/refresh-hash.service';
import { InvalidCredentials } from '@shared/exceptions/invalid-credentials.exception';
import { IsUserBlockedGuard } from '@shared/validators/is-user-blocked.guard';
import { LoginSchema } from '../../interfaces/schemas/login.schema';

@Injectable()
export class LoginUseCase {
  private readonly refreshTtlDays: number;

  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(AUTH_SESSION_REPOSITORY)
    private readonly sessions: IAuthSessionRepository,
    private readonly password: PasswordService,
    private readonly tokens: TokenService,
    private readonly refreshHash: RefreshHashService,
    private readonly config: ConfigService,
  ) {
    this.refreshTtlDays = this.config.get<number>('REFRESH_TTL_DAYS', 30);
  }

  async execute(
    dto: LoginDto,
    ctx?: { ip?: string; userAgent?: string },
  ): Promise<LoginSchema> {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw InvalidCredentials();

    IsUserBlockedGuard(user);

    const ok = await this.password.compare(dto.password, user.password);
    if (!ok) throw InvalidCredentials();

    // создаём random часть refresh токена
    const { randomPart } = this.tokens.createOpaqueRefreshToken();
    const refreshTokenHash = await this.refreshHash.hash(randomPart);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.refreshTtlDays);

    // создаём сессию
    const session = await this.sessions.createForUser({
      userId: user.id,
      refreshTokenHash,
      ip: ctx?.ip,
      userAgent: ctx?.userAgent,
      expiresAt,
    });

    // создаём access JWT
    const accessToken = await this.tokens.createAccessToken({
      sub: user.id,
      sid: session.id,
      email: user.email,
    });

    // собираем refresh для клиента
    const refreshToken = `${session.id}.${randomPart}`;

    return {
      user: { id: user.id, email: user.email, isActive: user.status },
      accessToken,
      refreshToken,
      accessTokenExpiresIn: this.config.get<string>(
        'JWT_ACCESS_EXPIRES',
        '15m',
      ),
      refreshExpiresAt: expiresAt.toISOString(),
    };
  }
}
