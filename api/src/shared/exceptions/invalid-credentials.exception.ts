import { applyDecorators, UnauthorizedException } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

const message = 'Неправильный email или пароль';

export const InvalidCredentials = () => new UnauthorizedException(message);

export const InvalidCredentialsApiException = applyDecorators(
  ApiUnauthorizedResponse({
    description: message,
  }),
);
