import { ApiProperty } from '@nestjs/swagger';

export class UserShortSchema {
  @ApiProperty({
    example: crypto.randomUUID(),
    title: 'ID созданного пользователя',
    description: 'Уникальный текстовый идентификатор пользователя',
  })
  id: string;

  @ApiProperty({
    example: 'admin@email.com',
    title: 'Email созданного пользователя',
    description: 'Уникальная электронная почта пользователя',
  })
  email: string;
}
