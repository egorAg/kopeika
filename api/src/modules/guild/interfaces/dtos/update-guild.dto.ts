import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGuildDto {
  @ApiPropertyOptional({ example: 'Новый бюджет семьи' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  dailyMinAmount?: number;
}
