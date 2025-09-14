import { ApiProperty } from '@nestjs/swagger';
import { UserShortSchema } from '../../../user/interfaces/schemas/user-short.schema';

export class LoginSchema {
  @ApiProperty({
    title: 'Данные пользователя',
    type: UserShortSchema,
  })
  user: UserShortSchema;

  @ApiProperty({
    title: 'Токен для авторизации',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  })
  refreshToken: string;

  @ApiProperty({
    title: 'Время жизни токена доступа',
    example: '1d',
  })
  accessTokenExpiresIn: string;

  @ApiProperty({
    title: 'Время жизни токена обновления доступа',
    example: '7d',
  })
  refreshExpiresAt: string;
}
