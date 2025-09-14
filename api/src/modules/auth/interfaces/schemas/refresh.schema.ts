import { ApiProperty } from '@nestjs/swagger';

export class RefreshSchema {
  @ApiProperty({
    title: 'Токен для авторизации',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'fb6b33ef-0286-4f50-b61b-62989dd9beed.8HFRTKmAxP0SvHz2LHR_VpJjVRruw5cc7ydC25drQW6',
  })
  refreshToken: string;

  @ApiProperty({
    title: 'Время жизни токена доступа',
    example: '15m',
  })
  accessTokenExpiresIn: string;

  @ApiProperty({
    title: 'Время истечения refresh-токена',
    example: '2025-09-14T12:34:56.000Z',
    nullable: true,
  })
  refreshExpiresAt: string | null;
}
