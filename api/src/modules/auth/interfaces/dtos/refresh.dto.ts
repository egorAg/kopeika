import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({ example: 'session-uuid.randomString' })
  @IsString()
  refreshToken: string;
}
