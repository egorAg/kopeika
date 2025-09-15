import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddGuildUserUseCase } from '../../application/usecases/add-guild-user.usecase';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GuildDetailSchema } from '../schemas/guild-detail.schema';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';
import { AddGuildUserDto } from '../dtos/add-guild-user.dto';
import { GuildsTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, ':id/users'))
export class AddGuildUserController {
  constructor(private readonly usecase: AddGuildUserUseCase) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить участника в гильдию по email' })
  @ApiResponse({ status: 201, type: GuildDetailSchema })
  async handle(
    @Param('id') guildId: string,
    @GetCurrentUser() user: CurrentUser,
    @Body() dto: AddGuildUserDto,
  ) {
    return this.usecase.execute(guildId, user.userId, dto);
  }
}
