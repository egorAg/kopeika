import { ApiProperty } from '@nestjs/swagger';
import type { ChestType } from '../../domain/entities/chest.entity';

export class ChestSchema {
  @ApiProperty({ example: 'uuid-chest-id' })
  id: string;

  @ApiProperty({ example: 'Сундук на отпуск' })
  name: string;

  @ApiProperty({
    example: 'saving',
    enum: [
      'debit',
      'creditCard',
      'saving',
      'credit',
      'installment',
      'microloan',
    ],
  })
  type: ChestType;

  @ApiProperty({ example: 'RUB' })
  currency: 'RUB' | 'USD' | 'EUR' | 'CNY';

  @ApiProperty({ example: 15000 })
  balance: number;

  @ApiProperty({ example: '2025-09-15T12:00:00.000Z' })
  createdAt: Date;
}
