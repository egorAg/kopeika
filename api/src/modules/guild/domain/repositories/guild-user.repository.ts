import { GuildUser } from '../entities/guild-user.entity';

export interface IGuildUserRepository {
  addUserToGuild(userId: string, guildId: string): Promise<GuildUser>;
  removeUserFromGuild(userId: string, guildId: string): Promise<void>;
  findByUserId(userId: string): Promise<GuildUser[]>;
  findByGuildId(guildId: string): Promise<GuildUser[]>;
}

export const GUILD_USER_REPOSITORY = Symbol('GUILD_USER_REPOSITORY');
