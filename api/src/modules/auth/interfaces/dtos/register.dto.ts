import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@email.com',
    description: 'Уникальный email пользователя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qweQWE123!',
    minLength: 6,
    description: 'Пароль пользователя',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
