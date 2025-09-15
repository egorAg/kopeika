import { Guild } from '../entities/guild.entity';

export interface IGuildRepository {
  findById(id: string): Promise<Guild | null>;
  findByUserId(userId: string): Promise<Guild[]>;
  create(data: Partial<Guild>): Promise<Guild>;
  update(id: string, data: Partial<Guild>): Promise<Guild>;
  delete(id: string): Promise<void>;
}

export const GUILD_REPOSITORY = Symbol('GUILD_REPOSITORY');
