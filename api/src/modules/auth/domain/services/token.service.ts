import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { AccessTokenPayload } from '../models/access-token-payload';

function toBase64Url(buf: Buffer) {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: string;

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.accessSecret = this.config.get<string>(
      'JWT_ACCESS_SECRET',
      'access_secret',
    );
    this.accessExpiresIn = this.config.get<string>('JWT_ACCESS_EXPIRES', '15m');
  }

  /**
   * Генерируем короткоживущий access-токен (JWT)
   */
  async createAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.jwt.signAsync(payload); // secret и expiresIn уже подтянуты из модуля
  }

  /**
   * Генерация opaque refresh токена.
   * Возвращаем два значения:
   * - rawToken: то, что отдаём клиенту (random строка)
   * - randomPart: её же нужно захэшировать и хранить в БД
   */
  createOpaqueRefreshToken() {
    const random = toBase64Url(crypto.randomBytes(48)); // ~64 символа
    return { rawToken: random, randomPart: random };
  }

  /**
   * Верификация access-токена (для guard’ов)
   */
  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    return this.jwt.verifyAsync<AccessTokenPayload>(token, {
      secret: this.accessSecret,
    });
  }
}
