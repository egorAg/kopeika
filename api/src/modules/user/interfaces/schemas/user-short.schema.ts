import { ApiProperty } from '@nestjs/swagger';
import type { UserStatus } from '../../domain/entities/user.entity';

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

  @ApiProperty({
    example: 'active',
    title: 'Статус пользователя',
    description: 'Заблокирован, отключен или активен ли пользователь в системе',
    enum: ['active', 'inactive', 'blocked'],
  })
  isActive: UserStatus;
}
