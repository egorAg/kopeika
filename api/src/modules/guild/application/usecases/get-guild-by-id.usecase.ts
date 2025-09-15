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

  async execute(guildId: string, userId: string): Promise<Guild> {
    const guild = await this.guilds.findById(guildId);

    if (!guild) {
      throw new NotFoundException('Гильдия не найдена');
    }

    const isMember = guild.users?.some((gu) => gu.user.id === userId);
    if (!isMember) {
      throw new ForbiddenException('Нет доступа к этой гильдии');
    }

    return guild;
  }
}
