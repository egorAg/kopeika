import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from './request-with-user';
import { AccessTokenPayload } from '../../modules/auth/domain/models/access-token-payload';
import { IsUserBlockedGuard } from '@shared/validators/is-user-blocked.guard';
import { USER_REPOSITORY } from 'src/modules/user/domain/repositories/user.repository';
import type { IUserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { User } from '../../modules/user/domain/entities/user.entity';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly users: IUserRepository,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Требуется access-токен');
    }

    const token = authHeader.slice(7);

    try {
      const payload = await this.jwt.verifyAsync<AccessTokenPayload>(token);
      const user = await this.users.findById(payload.sub);
      IsUserBlockedGuard(user as User);
      req.user = {
        userId: user!.id,
        sessionId: payload.sid,
        email: user!.email,
        isActive: user!.status,
      };
      return true;
    } catch (err) {
      throw new UnauthorizedException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        err?.message ?? 'Access-токен невалиден или истёк',
      );
    }
  }
}
