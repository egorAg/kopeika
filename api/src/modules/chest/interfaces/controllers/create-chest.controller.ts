import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateChestUseCase } from '../../application/usecases/create-chest.usecase';
import { Chest } from '../../domain/entities/chest.entity';
import { ChestsTag } from '@shared/tags/chests.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import type { CurrentUser } from '@shared/auth/request-with-user';
import { CreateChestDto } from '../dtos/create-chest.dto';

@ApiTags(ChestsTag)
@Controller(RouteBuilder(ModulesEnum.CHESTS, ':guildId/chests'))
export class CreateChestController {
  constructor(private readonly usecase: CreateChestUseCase) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать сундук в гильдии' })
  @ApiResponse({ status: 201, type: Chest })
  async handle(
    @Param('guildId') guildId: string,
    @GetCurrentUser() user: CurrentUser,
    @Body() dto: CreateChestDto,
  ) {
    return this.usecase.execute(guildId, user.userId, dto);
  }
}
