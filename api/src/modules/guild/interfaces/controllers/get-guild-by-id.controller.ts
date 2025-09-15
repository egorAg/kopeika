import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetGuildByIdUseCase } from '../../application/usecases/get-guild-by-id.usecase';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GuildDetailSchema } from '../schemas/guild-detail.schema';
import type { CurrentUser } from '@shared/auth/request-with-user';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import { GuildsTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, ':id'))
export class GetGuildByIdController {
  constructor(private readonly usecase: GetGuildByIdUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Детальная информация о гильдии' })
  @ApiResponse({ status: 200, type: GuildDetailSchema })
  async handle(
    @Param('id') guildId: string,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<GuildDetailSchema> {
    const guild = await this.usecase.execute(guildId, user.userId);

    return {
      id: guild.id,
      name: guild.name,
      dailyMinAmount: guild.dailyMinAmount,
      balance: guild.balance,
      createdAt: guild.createdAt,
      updatedAt: guild.updatedAt,
      users: guild.users.map((guildUser) => ({
        id: guildUser.id,
        email: guildUser.user.email,
        status: guildUser.user.status,
      })),
    };
  }
}
