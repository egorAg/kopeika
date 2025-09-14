import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUseCase } from '../../application/usecases/register.usecase';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterSchema } from '../schemas/register.schema';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { EmailAlreadyInUseApiException } from '@shared/exceptions/email-already-in-use.exception';
import { AuthTag } from '@shared/tags/auth.tag';

@ApiTags(AuthTag)
@Controller(RouteBuilder(ModulesEnum.AUTH, 'register'))
export class RegisterController {
  constructor(private readonly usecase: RegisterUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    type: RegisterSchema,
  })
  @EmailAlreadyInUseApiException
  async handle(@Body() dto: RegisterDto): Promise<RegisterSchema> {
    return this.usecase.execute(dto);
  }
}
