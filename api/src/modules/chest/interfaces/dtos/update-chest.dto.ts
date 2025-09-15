import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import type { ChestType } from '../../domain/entities/chest.entity';

export class UpdateChestDto {
  @ApiPropertyOptional({ example: 'Сундук на отпуск' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
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
  @IsOptional()
  @IsEnum([
    'debit',
    'creditCard',
    'saving',
    'credit',
    'installment',
    'microloan',
  ])
  type?: ChestType;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  currency?: 'RUB' | 'USD' | 'EUR' | 'CNY';

  @ApiPropertyOptional({ example: 20000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;

  // saving
  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  goalAmount?: number;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  goalDeadline?: Date;

  // credit card
  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  creditLimit?: number;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  currentDebt?: number;

  @ApiPropertyOptional({ example: 45 })
  @IsOptional()
  gracePeriodDays?: number;

  // credit/installment/microloan
  @ApiPropertyOptional({ example: 7000 })
  @IsOptional()
  monthlyPayment?: number;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  percent?: number;

  @ApiPropertyOptional({ example: '2027-01-01' })
  @IsOptional()
  endDate?: Date;
}
