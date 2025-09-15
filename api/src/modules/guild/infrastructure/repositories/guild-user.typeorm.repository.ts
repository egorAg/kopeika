import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IGuildUserRepository } from '../../domain/repositories/guild-user.repository';
import { GuildUser } from '../../domain/entities/guild-user.entity';

@Injectable()
export class GuildUserTypeormRepository implements IGuildUserRepository {
  constructor(
    @InjectRepository(GuildUser)
    private readonly repo: Repository<GuildUser>,
  ) {}

  async addUserToGuild(userId: string, guildId: string): Promise<GuildUser> {
    const entity = this.repo.create({
      user: { id: userId },
      guild: { id: guildId },
    });
    return this.repo.save(entity, { reload: true });
  }

  async removeUserFromGuild(userId: string, guildId: string): Promise<void> {
    await this.repo.delete({
      user: { id: userId } as any,
      guild: { id: guildId } as any,
    });
  }

  async findByUserId(userId: string): Promise<GuildUser[]> {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['guild'],
    });
  }

  async findByGuildId(guildId: string): Promise<GuildUser[]> {
    return this.repo.find({
      where: { guild: { id: guildId } },
      relations: ['user'],
    });
  }
}
