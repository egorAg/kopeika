import { applyDecorators, UnauthorizedException } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

const message = 'Сессия не найдена';

export const SessionNotFoundException = () =>
  new UnauthorizedException(message);

export const SessionNotFoundApiException = applyDecorators(
  ApiUnauthorizedResponse({ description: message }),
);
