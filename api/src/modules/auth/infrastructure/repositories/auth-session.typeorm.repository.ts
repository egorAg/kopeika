import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSession } from '../../domain/entities/auth-session.entity';

import type { IAuthSessionRepository } from '../../domain/repositories/auth-session.repository';

@Injectable()
export class AuthSessionTypeormRepository implements IAuthSessionRepository {
  constructor(
    @InjectRepository(AuthSession)
    private readonly repo: Repository<AuthSession>,
  ) {}

  async createForUser(params: {
    userId: string;
    refreshTokenHash: string;
    ip?: string;
    userAgent?: string;
    expiresAt: Date;
  }): Promise<AuthSession> {
    const entity = this.repo.create({
      user: { id: params.userId } as any,
      refreshTokenHash: params.refreshTokenHash,
      ip: params.ip,
      userAgent: params.userAgent,
      isActive: true,
      expiresAt: params.expiresAt,
      lastUsedAt: null,
    });
    return this.repo.save(entity);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: { user: true } });
  }

  findActiveById(id: string) {
    return this.repo.findOne({
      where: { id, isActive: true },
      relations: { user: true },
    });
  }

  async rotate(sessionId: string, newHash: string) {
    await this.repo.update({ id: sessionId }, { refreshTokenHash: newHash });
  }

  async touch(sessionId: string, ip?: string, userAgent?: string) {
    await this.repo.update(
      { id: sessionId },
      {
        lastUsedAt: new Date(),
        ...(ip ? { ip } : {}),
        ...(userAgent ? { userAgent } : {}),
      },
    );
  }

  async deactivate(sessionId: string) {
    await this.repo.update({ id: sessionId }, { isActive: false });
  }

  async deactivateAllForUser(userId: string, exceptSessionId?: string) {
    const qb = this.repo
      .createQueryBuilder()
      .update(AuthSession)
      .set({ isActive: false })
      .where('userId = :userId', { userId });

    if (exceptSessionId) {
      qb.andWhere('id != :exceptSessionId', { exceptSessionId });
    }

    await qb.execute();
  }
}
