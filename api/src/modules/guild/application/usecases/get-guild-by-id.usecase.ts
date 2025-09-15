import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';
import { Guild } from '../../domain/entities/guild.entity';

@Injectable()
export class GetGuildByIdUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
  ) {}

  async execute(
    guildId: string,
    userId: string,
  ): Promise<{ guild: Guild; totalBalance: number }> {
    const guild = await this.guilds.findById(guildId);

    if (!guild) {
      throw new NotFoundException('Гильдия не найдена');
    }

    const isMember = guild.users?.some((gu) => gu.user.id === userId);
    if (!isMember) {
      throw new ForbiddenException('Нет доступа к этой гильдии');
    }

    let totalBalance: number = 0;

    guild.chests.forEach((chest) => (totalBalance += +chest.balance));

    await this.guilds.updateBalance(guildId, totalBalance);

    return { guild, totalBalance };
  }
}
