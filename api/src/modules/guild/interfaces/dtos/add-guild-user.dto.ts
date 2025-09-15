import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AddGuildUserDto {
  @ApiProperty({
    example: 'friend@example.com',
    description: 'Email пользователя для добавления в гильдию',
  })
  @IsEmail()
  email: string;
}
