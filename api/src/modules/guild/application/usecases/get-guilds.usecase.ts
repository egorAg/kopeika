import { Inject, Injectable } from '@nestjs/common';
import { GUILD_REPOSITORY } from '../../domain/repositories/guild.repository';
import type { IGuildRepository } from '../../domain/repositories/guild.repository';

@Injectable()
export class GetGuildsUseCase {
  constructor(
    @Inject(GUILD_REPOSITORY) private readonly guilds: IGuildRepository,
  ) {}

  async execute(userId: string) {
    return this.guilds.findByUserId(userId);
  }
}
