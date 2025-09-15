import { ApiProperty } from '@nestjs/swagger';
import { GuildUserSchema } from './guild-user.schema';

export class GuildDetailSchema {
  @ApiProperty({ example: 'uuid-guild-id' })
  id: string;

  @ApiProperty({ example: 'Семейный бюджет' })
  name: string;

  @ApiProperty({ example: 1000 })
  dailyMinAmount: number;

  @ApiProperty({ example: 15000 })
  balance: number;

  @ApiProperty({ example: '2025-09-15T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-15T12:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ type: [GuildUserSchema] })
  users: GuildUserSchema[];
}
