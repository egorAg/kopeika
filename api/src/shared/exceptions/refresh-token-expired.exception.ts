import { applyDecorators, ForbiddenException } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';

const message = 'Срок действия refresh токена истёк';

export const RefreshTokenExpiredException = () =>
  new ForbiddenException(message);

export const RefreshTokenExpiredApiException = applyDecorators(
  ApiForbiddenResponse({ description: message }),
);
