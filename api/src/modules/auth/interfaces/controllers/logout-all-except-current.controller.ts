import { AuthTag } from '@shared/tags/auth.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { MalformedRefreshTokenApiException } from '@shared/exceptions/malformed-refresh-token.exception';
import { InvalidRefreshTokenApiException } from '@shared/exceptions/invalid-refresh-token.exception';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogoutAllExceptCurrentUseCase } from '../../application/usecases/logout-all-except-current.usecase';
import { LogoutSchema } from '../schemas/logout.schema';
import { LogoutDto } from '../dtos/logout.dto';

@ApiTags(AuthTag)
@Controller(RouteBuilder(ModulesEnum.AUTH, 'logout-all-except-current'))
export class LogoutAllExceptCurrentController {
  constructor(private readonly usecase: LogoutAllExceptCurrentUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Выход со всех сессий, кроме текущей' })
  @ApiResponse({
    status: 201,
    description: 'Все остальные сессии завершены',
    type: LogoutSchema,
  })
  @MalformedRefreshTokenApiException
  @InvalidRefreshTokenApiException
  handle(@Body() dto: LogoutDto) {
    return this.usecase.execute(dto);
  }
}
