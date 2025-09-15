import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateGuildUseCase } from '../../application/usecases/update-guild.usecase';
import { GuildsTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GuildDetailSchema } from '../schemas/guild-detail.schema';
import type { CurrentUser } from '@shared/auth/request-with-user';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import { UpdateGuildDto } from '../dtos/update-guild.dto';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, ':id'))
export class UpdateGuildController {
  constructor(private readonly usecase: UpdateGuildUseCase) {}

  @Patch()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить данные гильдии' })
  @ApiResponse({ status: 200, type: GuildDetailSchema })
  async handle(
    @Param('id') guildId: string,
    @GetCurrentUser() user: CurrentUser,
    @Body() dto: UpdateGuildDto,
  ): Promise<GuildDetailSchema> {
    const guild = await this.usecase.execute(guildId, user.userId, dto);

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
