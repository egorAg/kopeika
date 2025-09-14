import { Injectable, Inject } from '@nestjs/common';
import type { IAuthSessionRepository } from '../../domain/repositories/auth-session.repository';
import { AUTH_SESSION_REPOSITORY } from '../../domain/repositories/auth-session.repository';
import { MalformedRefreshTokenException } from '@shared/exceptions/malformed-refresh-token.exception';
import { LogoutDto } from '../../interfaces/dtos/logout.dto';
import { InvalidRefreshTokenException } from '@shared/exceptions/invalid-refresh-token.exception';

function parseRefresh(refresh: string): { sessionId: string; random: string } {
  const [sessionId, random] = refresh.split('.');
  if (!sessionId || !random) throw MalformedRefreshTokenException();
  return { sessionId, random };
}

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(AUTH_SESSION_REPOSITORY)
    private readonly sessions: IAuthSessionRepository,
  ) {}

  async execute(dto: LogoutDto) {
    const { sessionId } = parseRefresh(dto.refreshToken);

    const session = await this.sessions.findActiveById(sessionId);
    if (!session) throw InvalidRefreshTokenException();

    await this.sessions.deactivate(sessionId);

    return { ok: true };
  }
}
