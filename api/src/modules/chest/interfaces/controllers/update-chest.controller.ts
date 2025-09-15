import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateChestUseCase } from '../../application/usecases/update-chest.usecase';
import { ChestsTag } from '@shared/tags/chests.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { ChestDetailSchema } from '../schemas/chest-detail.schema';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';
import { UpdateChestDto } from '../dtos/update-chest.dto';

@ApiTags(ChestsTag)
@Controller(RouteBuilder(ModulesEnum.CHESTS, ':id'))
export class UpdateChestController {
  constructor(private readonly usecase: UpdateChestUseCase) {}

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить сундук' })
  @ApiResponse({ status: 200, type: ChestDetailSchema })
  async handle(
    @Param('id') chestId: string,
    @GetCurrentUser() user: CurrentUser,
    @Body() dto: UpdateChestDto,
  ): Promise<ChestDetailSchema> {
    return this.usecase.execute(chestId, user.userId, dto);
  }
}
