import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetChestByIdUseCase } from '../../application/usecases/get-chest-by-id.usecase';
import { ChestsTag } from '@shared/tags/chests.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { ChestDetailSchema } from '../schemas/chest-detail.schema';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';

@ApiTags(ChestsTag)
@Controller(RouteBuilder(ModulesEnum.CHESTS, ':id'))
export class GetChestByIdController {
  constructor(private readonly usecase: GetChestByIdUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Детальная информация о сундуке' })
  @ApiResponse({ status: 200, type: ChestDetailSchema })
  async handle(
    @Param('id') chestId: string,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<ChestDetailSchema> {
    const chest = await this.usecase.execute(chestId, user.userId);

    return {
      balance: chest.balance,
      createdAt: chest.createdAt,
      creditLimit: chest.creditLimit,
      currency: chest.currency,
      currentDebt: chest.currentDebt,
      endDate: chest.endDate,
      goalAmount: chest.goalAmount,
      goalDeadline: chest.goalDeadline,
      gracePeriodDays: chest.gracePeriodDays,
      id: chestId,
      monthlyPayment: chest.monthlyPayment,
      name: chest.name,
      percent: chest.percent,
      type: chest.type,
      updatedAt: chest.updatedAt,
    };
  }
}
