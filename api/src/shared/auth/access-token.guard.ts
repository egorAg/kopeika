import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from './request-with-user';
import { AccessTokenPayload } from '../../modules/auth/domain/models/access-token-payload';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Требуется access-токен');
    }

    const token = authHeader.slice(7);

    try {
      const payload = await this.jwt.verifyAsync<AccessTokenPayload>(token);
      req.user = {
        userId: payload.sub,
        sessionId: payload.sid,
        email: payload.email,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Access-токен невалиден или истёк');
    }
  }
}
