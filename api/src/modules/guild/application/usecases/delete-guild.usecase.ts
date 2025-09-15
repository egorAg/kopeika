import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';

@Injectable()
export class DeleteGuildUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
  ) {}

  async execute(guildId: string, userId: string): Promise<void> {
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Гильдия не найдена');

    const isMember = guild.users?.some((gu) => gu.user.id === userId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этой гильдии');

    await this.guilds.delete(guildId);
  }
}
