import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogoutUseCase } from '../../application/usecases/logout.usecase';
import { LogoutSchema } from '../schemas/logout.schema';
import { MalformedRefreshTokenApiException } from '@shared/exceptions/malformed-refresh-token.exception';
import { InvalidRefreshTokenApiException } from '@shared/exceptions/invalid-refresh-token.exception';
import { LogoutDto } from '../dtos/logout.dto';
import { AuthTag } from '@shared/tags/auth.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';

@ApiTags(AuthTag)
@Controller(RouteBuilder(ModulesEnum.AUTH, 'logout'))
export class LogoutController {
  constructor(private readonly usecase: LogoutUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Выход из системы (отзыв refresh-токена)' })
  @ApiResponse({
    status: 201,
    description: 'Сессия успешно завершена',
    type: LogoutSchema,
  })
  @MalformedRefreshTokenApiException
  @InvalidRefreshTokenApiException
  handle(@Body() dto: LogoutDto) {
    return this.usecase.execute(dto);
  }
}
