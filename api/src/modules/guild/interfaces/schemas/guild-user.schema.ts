import { ApiProperty } from '@nestjs/swagger';

export class GuildUserSchema {
  @ApiProperty({ example: 'uuid-user-id' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'active' })
  status: string;
}
