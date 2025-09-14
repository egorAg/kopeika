import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IsNumberGuard } from '@shared/validators/is-number.guard';

@Injectable()
export class RefreshHashService {
  private readonly rounds: number;

  constructor(private readonly config: ConfigService) {
    const envRounds = Number(this.config.get<number>('BCRYPT_ROUNDS', 12));
    IsNumberGuard(envRounds, 'Параметр соли не число');
    this.rounds = envRounds;
  }

  hash(tokenRandomPart: string) {
    return bcrypt.hash(tokenRandomPart, this.rounds);
  }

  compare(tokenRandomPart: string, hash: string) {
    return bcrypt.compare(tokenRandomPart, hash);
  }
}
