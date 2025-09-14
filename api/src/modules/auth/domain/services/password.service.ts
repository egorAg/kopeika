import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  private readonly rounds: number;

  constructor(private readonly config: ConfigService) {
    this.rounds = this.config.get<number>('BCRYPT_ROUNDS', 12);
  }

  hash(plain: string) {
    return bcrypt.hash(plain, this.rounds);
  }

  compare(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
