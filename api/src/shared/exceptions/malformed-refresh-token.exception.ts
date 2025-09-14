import { applyDecorators, UnauthorizedException } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

const message = 'Неверный формат refresh токена';

export const MalformedRefreshTokenException = () =>
  new UnauthorizedException(message);

export const MalformedRefreshTokenApiException = applyDecorators(
  ApiUnauthorizedResponse({ description: message }),
);
