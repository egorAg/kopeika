import { Injectable, Inject } from '@nestjs/common';

import { PasswordService } from '../../domain/services/password.service';
import { USER_REPOSITORY } from '../../../user/domain/repositories/user.repository';
import { RegisterDto } from '../../interfaces/dtos/register.dto';
import type { IUserRepository } from '../../../user/domain/repositories/user.repository';
import { RegisterSchema } from '../../interfaces/schemas/register.schema';
import { EmailAlreadyInUseException } from '@shared/exceptions/email-already-in-use.exception';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    private readonly passwords: PasswordService,
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterSchema> {
    const exists = await this.users.findByEmail(dto.email);

    if (exists) EmailAlreadyInUseException();

    const hash = await this.passwords.hash(dto.password);
    const user = await this.users.create({ email: dto.email, password: hash });

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
