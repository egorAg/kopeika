import { AuthSession } from '../entities/auth-session.entity';

export interface IAuthSessionRepository {
  createForUser(params: {
    userId: string;
    refreshTokenHash: string;
    ip?: string;
    userAgent?: string;
    expiresAt: Date;
  }): Promise<AuthSession>;
  findById(id: string): Promise<AuthSession | null>;
  findActiveById(id: string): Promise<AuthSession | null>;
  rotate(sessionId: string, newHash: string): Promise<void>;
  touch(sessionId: string, ip?: string, userAgent?: string): Promise<void>;
  deactivate(sessionId: string): Promise<void>;
  deactivateAllForUser(userId: string, exceptSessionId?: string): Promise<void>;
}

export const AUTH_SESSION_REPOSITORY = Symbol('AUTH_SESSION_REPOSITORY');
