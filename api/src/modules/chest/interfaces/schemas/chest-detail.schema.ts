import { ApiProperty } from '@nestjs/swagger';
import type { ChestType } from '../../domain/entities/chest.entity';

export class ChestDetailSchema {
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

  @ApiProperty({ example: 50000, nullable: true })
  creditLimit?: number;

  @ApiProperty({ example: 10000, nullable: true })
  currentDebt?: number;

  @ApiProperty({ example: 50, nullable: true })
  gracePeriodDays?: number;

  @ApiProperty({ example: 10000, nullable: true })
  goalAmount?: number;

  @ApiProperty({ example: '2025-12-31T00:00:00.000Z', nullable: true })
  goalDeadline?: Date;

  @ApiProperty({ example: 5000, nullable: true })
  monthlyPayment?: number;

  @ApiProperty({ example: 15, nullable: true })
  percent?: number;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  endDate?: Date;

  @ApiProperty({ example: '2025-09-15T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-15T12:00:00.000Z' })
  updatedAt: Date;
}
