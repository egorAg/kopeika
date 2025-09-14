import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qweQWE123!' })
  @IsString()
  password: string;
}
