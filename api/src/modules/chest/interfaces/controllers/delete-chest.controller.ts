import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteChestUseCase } from '../../application/usecases/delete-chest.usecase';
import { ChestsTag } from '@shared/tags/chests.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';

@ApiTags(ChestsTag)
@Controller(RouteBuilder(ModulesEnum.CHESTS, ':id'))
export class DeleteChestController {
  constructor(private readonly usecase: DeleteChestUseCase) {}

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить сундук' })
  @ApiResponse({ status: 204, description: 'Сундук удалён' })
  async handle(
    @Param('id') chestId: string,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<void> {
    return this.usecase.execute(chestId, user.userId);
  }
}
