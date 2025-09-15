import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildUserRepository } from '../../domain/repositories/guild-user.repository';
import { GUILD_USER_REPOSITORY } from '../../domain/repositories/guild-user.repository';
import type { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../user/domain/repositories/user.repository';
import { AddGuildUserDto } from '../../interfaces/dtos/add-guild-user.dto';

@Injectable()
export class AddGuildUserUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
    @Inject(GUILD_USER_REPOSITORY)
    private readonly guildUsers: IGuildUserRepository,
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
  ) {}

  async execute(guildId: string, currentUserId: string, dto: AddGuildUserDto) {
    const guild = await this.guilds.findById(guildId);
    if (!guild) throw new NotFoundException('Гильдия не найдена');

    const isMember = guild.users?.some((gu) => gu.user.id === currentUserId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этой гильдии');

    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new NotFoundException('Пользователь не найден');

    const alreadyInGuild = guild.users?.some((gu) => gu.user.id === user.id);
    if (alreadyInGuild) {
      throw new ConflictException('Пользователь уже в гильдии');
    }

    return this.guildUsers.addUserToGuild(user.id, guildId);
  }
}
