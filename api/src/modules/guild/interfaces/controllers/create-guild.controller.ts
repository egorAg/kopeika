import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GuildSchema } from '../schemas/guild.schema';
import { CreateGuildUseCase } from '../../application/usecases/create-guild.usecase';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { CreateGuildDto } from '../dtos/create-guild.dto';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';
import { GuildsTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import type { CurrentUser } from '@shared/auth/request-with-user';

@ApiTags(GuildsTag)
@Controller(RouteBuilder(ModulesEnum.GUILDS, 'create'))
export class CreateGuildController {
  constructor(private readonly usecase: CreateGuildUseCase) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новую гильдию' })
  @ApiResponse({ status: 201, type: GuildSchema })
  async handle(
    @Body() dto: CreateGuildDto,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<GuildSchema> {
    return this.usecase.execute(dto, user);
  }
}
