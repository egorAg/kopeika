import { applyDecorators, UnauthorizedException } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

const message = 'Refresh токен невалидный';

export const InvalidRefreshTokenException = () =>
  new UnauthorizedException(message);

export const InvalidRefreshTokenApiException = applyDecorators(
  ApiUnauthorizedResponse({ description: message }),
);
