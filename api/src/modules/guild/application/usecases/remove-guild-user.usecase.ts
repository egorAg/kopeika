import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildUserRepository } from '../../domain/repositories/guild-user.repository';
import { GUILD_USER_REPOSITORY } from '../../domain/repositories/guild-user.repository';

@Injectable()
export class RemoveGuildUserUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
    @Inject(GUILD_USER_REPOSITORY)
    private readonly guildUsers: IGuildUserRepository,
  ) {}

  async execute(
    guildId: string,
    currentUserId: string,
    targetUserId: string,
  ): Promise<void> {
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Гильдия не найдена');

    const isMember = guild.users?.some((gu) => gu.user.id === currentUserId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этой гильдии');

    const targetMember = guild.users?.some((gu) => gu.user.id === targetUserId);
    if (!targetMember) {
      throw new NotFoundException('Пользователь не состоит в гильдии');
    }

    await this.guildUsers.removeUserFromGuild(targetUserId, guildId);
  }
}
