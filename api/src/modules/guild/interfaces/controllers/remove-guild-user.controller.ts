import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveGuildUserUseCase } from '../../application/usecases/remove-guild-user.usecase';
import { GuildsTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, ':id/users/:userId'))
export class RemoveGuildUserController {
  constructor(private readonly usecase: RemoveGuildUserUseCase) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить пользователя из гильдии' })
  @ApiResponse({ status: 204, description: 'Пользователь удалён из гильдии' })
  async handle(
    @Param('id') guildId: string,
    @Param('userId') targetUserId: string,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<void> {
    return this.usecase.execute(guildId, user.userId, targetUserId);
  }
}
