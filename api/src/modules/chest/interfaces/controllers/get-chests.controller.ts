import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetChestsUseCase } from '../../application/usecases/get-chests.usecase';
import { ChestSchema } from '../schemas/chest.schema';
import { ChestsTag } from '@shared/tags/chests.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';

@ApiTags(ChestsTag)
@Controller(RouteBuilder(ModulesEnum.CHESTS, ':guildId/chests'))
export class GetChestsController {
  constructor(private readonly usecase: GetChestsUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Список сундуков гильдии' })
  @ApiResponse({ status: 200, type: [ChestSchema] })
  async handle(
    @Param('guildId') guildId: string,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<ChestSchema[]> {
    const chests = await this.usecase.execute(guildId, user.userId);

    return chests.map((chest) => ({
      id: chest.id,
      name: chest.name,
      type: chest.type,
      currency: chest.currency,
      balance: chest.balance,
      createdAt: chest.createdAt,
    }));
  }
}
