import { Injectable, Inject } from '@nestjs/common';
import type { IAuthSessionRepository } from '../../domain/repositories/auth-session.repository';
import { AUTH_SESSION_REPOSITORY } from '../../domain/repositories/auth-session.repository';
import { RefreshHashService } from '../../domain/services/refresh-hash.service';
import { TokenService } from '../../domain/services/token.service';
import { RefreshDto } from '../../interfaces/dtos/refresh.dto';
import { RefreshSchema } from '../../interfaces/schemas/refresh.schema';
import { MalformedRefreshTokenException } from '@shared/exceptions/malformed-refresh-token.exception';
import { SessionNotFoundException } from '@shared/exceptions/session-not-found.exception';
import { RefreshTokenExpiredException } from '@shared/exceptions/refresh-token-expired.exception';
import { InvalidRefreshTokenException } from '@shared/exceptions/invalid-refresh-token.exception';

function parseRefresh(refresh: string): { sessionId: string; random: string } {
  const [sessionId, random] = refresh.split('.');
  if (!sessionId || !random) {
    throw MalformedRefreshTokenException();
  }
  return { sessionId, random };
}

@Injectable()
export class RefreshUseCase {
  constructor(
    @Inject(AUTH_SESSION_REPOSITORY)
    private readonly sessions: IAuthSessionRepository,
    private readonly refreshHash: RefreshHashService,
    private readonly tokens: TokenService,
  ) {}

  async execute(
    dto: RefreshDto,
    ctx?: { ip?: string; userAgent?: string },
  ): Promise<RefreshSchema> {
    const { sessionId, random } = parseRefresh(dto.refreshToken);

    const session = await this.sessions.findActiveById(sessionId);
    if (!session) throw SessionNotFoundException();

    if (session.expiresAt && session.expiresAt < new Date()) {
      throw RefreshTokenExpiredException();
    }

    const ok = await this.refreshHash.compare(random, session.refreshTokenHash);
    if (!ok) throw InvalidRefreshTokenException();

    const { randomPart } = this.tokens.createOpaqueRefreshToken();
    const newHash = await this.refreshHash.hash(randomPart);
    await this.sessions.rotate(session.id, newHash);
    await this.sessions.touch(session.id, ctx?.ip, ctx?.userAgent);

    const accessToken = await this.tokens.createAccessToken({
      sub: session.user.id,
      sid: session.id,
      email: session.user.email,
    });

    return {
      accessToken,
      refreshToken: `${session.id}.${randomPart}`,
      accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES ?? '15m',
      refreshExpiresAt: session.expiresAt?.toISOString() ?? null,
    };
  }
}
