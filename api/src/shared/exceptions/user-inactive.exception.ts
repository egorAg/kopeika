import { applyDecorators, UnauthorizedException } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

const message = 'Аккаунт отключен пользователем';

export const UserInactiveException = () => new UnauthorizedException(message);

export const UserInactiveApiException = applyDecorators(
  ApiUnauthorizedResponse({ description: message }),
);
