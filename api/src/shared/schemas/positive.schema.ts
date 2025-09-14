import { ApiProperty } from '@nestjs/swagger';

export class PositiveResponseSchema {
  @ApiProperty({ example: true })
  ok: boolean;
}
