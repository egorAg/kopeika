import { ApiProperty } from '@nestjs/swagger';
import type { UserRegisteredVia } from '../../../user/domain/entities/user.entity';
import { UserShortSchema } from '../../../user/interfaces/schemas/user-short.schema';

export class RegisterSchema extends UserShortSchema {
  @ApiProperty({ example: 'email', enum: ['email', 'phone'] })
  registeredVia: UserRegisteredVia;

  @ApiProperty({ example: '2025-09-14T12:00:00.000Z' })
  createdAt: string;
}
