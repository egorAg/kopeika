import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserShortSchema } from '../schemas/user-short.schema';
import { UsersTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { AccessTokenGuard } from '@shared/auth/access-token.guard';
import { GetCurrentUser } from '@shared/auth/current-user.decorator';

@ApiTags(UsersTag)
@Controller(RouteBuilder(ModulesEnum.USERS, 'me'))
export class UserMeController {
  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить данные текущего пользователя' })
  @ApiResponse({ status: 200, type: UserShortSchema })
  getMe(@GetCurrentUser() user: { userId: string; email: string }) {
    return {
      id: user.userId,
      email: user.email,
    };
  }
}
