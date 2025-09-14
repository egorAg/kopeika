import { Body, Controller, Headers, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/usecases/login.usecase';
import { AuthTag } from '@shared/tags/auth.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { LoginDto } from '../dtos/login.dto';
import { LoginSchema } from '../schemas/login.schema';
import { InvalidCredentialsApiException } from '@shared/exceptions/invalid-credentials.exception';

@ApiTags(AuthTag)
@Controller(RouteBuilder(ModulesEnum.AUTH, 'login'))
export class LoginController {
  constructor(private readonly usecase: LoginUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Авторизация пользователя (логин)' })
  @ApiResponse({
    status: 201,
    description: 'Успешный вход',
    type: LoginSchema,
  })
  @InvalidCredentialsApiException
  handle(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<LoginSchema> {
    return this.usecase.execute(dto, { ip, userAgent });
  }
}
