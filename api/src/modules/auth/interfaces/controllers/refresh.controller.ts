import { Body, Controller, Headers, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshUseCase } from '../../application/usecases/refresh.usecase';
import { RefreshDto } from '../dtos/refresh.dto';
import { AuthTag } from '@shared/tags/auth.tag';
import { ModulesEnum, RouteBuilder } from '@shared/routes';
import { RefreshSchema } from '../schemas/refresh.schema';
import { MalformedRefreshTokenApiException } from '@shared/exceptions/malformed-refresh-token.exception';
import { InvalidRefreshTokenApiException } from '@shared/exceptions/invalid-refresh-token.exception';

@ApiTags(AuthTag)
@Controller(RouteBuilder(ModulesEnum.AUTH, 'refresh'))
export class RefreshController {
  constructor(private readonly usecase: RefreshUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Обновление access токена по refresh токену' })
  @ApiResponse({
    status: 201,
    description: 'Новый access+refresh выданы',
    type: RefreshSchema,
  })
  @MalformedRefreshTokenApiException
  @InvalidRefreshTokenApiException
  handle(
    @Body() dto: RefreshDto,
    @Ip() ip: string,
    @Headers('user-agent') ua: string,
  ): Promise<RefreshSchema> {
    return this.usecase.execute(dto, { ip, userAgent: ua });
  }
}
