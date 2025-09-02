import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+79998887766' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'securePass123', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
