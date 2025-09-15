import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteGuildUseCase } from '../../application/usecases/delete-guild.usecase';
import { GuildsTag } from '@shared/tags';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, ':id'))
export class DeleteGuildController {
  constructor(private readonly usecase: DeleteGuildUseCase) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить гильдию' })
  @ApiResponse({ status: 204, description: 'Гильдия удалена' })
  async handle(
    @Param('id') guildId: string,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<void> {
    return this.usecase.execute(guildId, user.userId);
  }
}
