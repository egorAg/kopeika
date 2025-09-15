import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';
import { Guild } from '../../domain/entities/guild.entity';

@Injectable()
export class GuildTypeormRepository implements IGuildRepository {
  constructor(
    @InjectRepository(Guild)
    private readonly repo: Repository<Guild>,
  ) {}

  async findById(id: string): Promise<Guild | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['users', 'history'],
    });
  }

  async findByUserId(userId: string): Promise<Guild[]> {
    return this.repo
      .createQueryBuilder('guild')
      .innerJoin('guild.users', 'guildUser')
      .where('guildUser.user.id = :userId', { userId })
      .leftJoinAndSelect('guild.users', 'users')
      .leftJoinAndSelect('guild.history', 'history')
      .getMany();
  }

  async create(data: Partial<Guild>): Promise<Guild> {
    const guild = this.repo.create(data);
    return this.repo.save(guild);
  }

  async update(id: string, data: Partial<Guild>): Promise<Guild> {
    await this.repo.update(id, data);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
