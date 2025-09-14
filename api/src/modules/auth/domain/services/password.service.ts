import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IsNumberGuard } from '@shared/validators/is-number.guard';

@Injectable()
export class PasswordService {
  private readonly rounds: number;

  constructor(private readonly config: ConfigService) {
    this.rounds = Number(this.config.get<number>('BCRYPT_ROUNDS', 12));
    IsNumberGuard(this.rounds);
  }

  hash(plain: string) {
    return bcrypt.hash(plain, this.rounds);
  }

  compare(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
