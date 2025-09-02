import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersTag } from '@shared/tags';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { RegisterUserUsecase } from './RegisterUser.usecase';

@ApiTags(UsersTag)
@Controller(RouteBuilder(ModulesEnum.USERS, 'register-user'))
export class RegisterUserController {
  constructor(private readonly usecase: RegisterUserUsecase) {}

  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @Post()
  execute(@Body() dto: RegisterUserDto): Promise<void> {
    return this.usecase.execute(dto);
  }
}
