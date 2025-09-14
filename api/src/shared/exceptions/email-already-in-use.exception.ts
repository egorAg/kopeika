import { applyDecorators, ConflictException } from '@nestjs/common';
import { ApiConflictResponse } from '@nestjs/swagger';

const message = 'Пользователь с таким адресом электронной почты уже существует';

export const EmailAlreadyInUseException = () => new ConflictException(message);

export const EmailAlreadyInUseApiException = applyDecorators(
  ApiConflictResponse({
    description: message,
  }),
);
