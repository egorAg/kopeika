import { Inject, Injectable } from '@nestjs/common';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';
import { GUILD_USER_REPOSITORY } from '../../domain/repositories/guild-user.repository';
import type { IGuildUserRepository } from '../../domain/repositories/guild-user.repository';
import { CreateGuildDto } from '../../interfaces/dtos/create-guild.dto';
import { GuildSchema } from '../../interfaces/schemas/guild.schema';
import type { CurrentUser } from '@shared/auth/request-with-user';

@Injectable()
export class CreateGuildUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
    @Inject(GUILD_USER_REPOSITORY)
    private readonly guildUsers: IGuildUserRepository,
  ) {}

  async execute(
    dto: CreateGuildDto,
    currentUser: CurrentUser,
  ): Promise<GuildSchema> {
    const guild = await this.guilds.create({
      name: dto.name,
      dailyMinAmount: dto.dailyMinAmount ?? 1000,
      balance: 0,
    });

    await this.guildUsers.addUserToGuild(currentUser.userId, guild.id);

    return { ...guild, createdAt: guild.createdAt.toISOString() };
  }
}
