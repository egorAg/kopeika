import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuildDto {
  @ApiProperty({ example: 'Семейный бюджет' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1000,
    description: 'Минимальная сумма на день (по умолчанию 1000)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  dailyMinAmount?: number;
}
