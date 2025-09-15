import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';
import { UpdateGuildDto } from '../../interfaces/dtos/update-guild.dto';

@Injectable()
export class UpdateGuildUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
  ) {}

  async execute(guildId: string, userId: string, dto: UpdateGuildDto) {
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Гильдия не найдена');

    const isMember = guild.users?.some((gu) => gu.user.id === userId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этой гильдии');

    return this.guilds.update(guildId, dto);
  }
}
