import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { IChestRepository } from '../../domain/repositories/chest.repository';
import { CHEST_REPOSITORY } from '../../domain/repositories/chest.repository';
import type { IGuildRepository } from '../../../guild/domain/repositories/guild.repository';
import { GUILD_REPOSITORY } from '../../../guild/domain/repositories/guild.repository';

@Injectable()
export class GetChestsUseCase {
  constructor(
    @Inject(CHEST_REPOSITORY) private readonly chests: IChestRepository,
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
  ) {}

  async execute(guildId: string, userId: string) {
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Гильдия не найдена');

    const isMember = guild.users?.some((gu) => gu.user.id === userId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этой гильдии');

    return this.chests.findByGuildId(guildId);
  }
}
