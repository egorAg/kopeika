import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({
    example:
      'fb6b33ef-0286-4f50-b61b-62989dd9beed.8HFRTKmAxP0SvHz2LHR_VpJjVRruw5cc7ydC25drQW6',
    description: 'Refresh токен, который нужно отозвать',
  })
  @IsString()
  refreshToken: string;
}
