import { applyDecorators, UnauthorizedException } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

const message = 'Аккаунт заблокирован';

export const UserBlockedException = () => new UnauthorizedException(message);

export const UserBlockedApiException = applyDecorators(
  ApiUnauthorizedResponse({ description: message }),
);
