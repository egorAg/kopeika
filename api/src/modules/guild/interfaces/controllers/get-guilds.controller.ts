import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetGuildsUseCase } from '../../application/usecases/get-guilds.usecase';
import { GuildsTag } from '@shared/tags';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';
import { GuildSchema } from '../schemas/guild.schema';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, 'list'))
export class GetGuildsController {
  constructor(private readonly usecase: GetGuildsUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Список гильдий текущего пользователя' })
  @ApiResponse({ status: 200, type: [GuildSchema] })
  async handle(@GetCurrentUser() user: CurrentUser): Promise<GuildSchema[]> {
    return this.usecase.execute(user.userId);
  }
}
