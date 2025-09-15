import { ApiProperty } from '@nestjs/swagger';

export class GuildSchema {
  @ApiProperty({ example: 'uuid-guild-id' })
  id: string;

  @ApiProperty({ example: 'Семейный бюджет' })
  name: string;

  @ApiProperty({ example: 1000 })
  dailyMinAmount: number;

  @ApiProperty({ example: 0 })
  balance: number;

  @ApiProperty({ example: '2025-09-15T12:00:00.000Z' })
  createdAt: string;
}
