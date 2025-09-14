import { ApiProperty } from '@nestjs/swagger';
import { UserShortSchema } from '../../../user/interfaces/schemas/user-short.schema';

export class RegisterSchema extends UserShortSchema {
  @ApiProperty({
    example: new Date().toISOString(),
    title: 'Время создания',
    description: 'Время создания пользователя',
  })
  createdAt: string;
}
