import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import type { ChestType } from '../../domain/entities/chest.entity';

export class CreateChestDto {
  @ApiProperty({ example: 'Сундук на отпуск' })
  @IsString()
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
  @IsEnum([
    'debit',
    'creditCard',
    'saving',
    'credit',
    'installment',
    'microloan',
  ])
  type: ChestType;

  @ApiProperty({
    example: 'RUB',
    enum: ['RUB', 'USD', 'EUR', 'CNY'],
    default: 'RUB',
  })
  currency: 'RUB' | 'USD' | 'EUR' | 'CNY';

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;

  // поля для saving
  @ApiProperty({ example: 10000, required: false })
  @IsOptional()
  goalAmount?: number;

  @ApiProperty({ example: '2025-12-31', required: false })
  @IsOptional()
  goalDeadline?: Date;

  // поля для кредитки
  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  creditLimit?: number;

  @ApiProperty({ example: 10000, required: false })
  @IsOptional()
  currentDebt?: number;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  gracePeriodDays?: number;

  // поля для кредитов/рассрочек
  @ApiProperty({ example: 5000, required: false })
  @IsOptional()
  monthlyPayment?: number;

  @ApiProperty({ example: 15, required: false })
  @IsOptional()
  percent?: number;

  @ApiProperty({ example: '2026-01-01', required: false })
  @IsOptional()
  endDate?: Date;
}
