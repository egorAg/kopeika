import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../../domain/services/user-domain.service';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { ConflictException, Inject } from '@nestjs/common';

export class RegisterUserUsecase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: UserRepository,
    @Inject(UserDomainService)
    private readonly userDomain: UserDomainService,
  ) {}

  async execute(dto: RegisterUserDto): Promise<void> {
    const existsByEmail = await this.userRepo.findByEmail(dto.email);
    const existsByPhone = await this.userRepo.findByPhone(dto.phone);

    if (existsByEmail || existsByPhone) {
      throw new ConflictException(
        'Пользователь с таким email или номером телефона уже существует',
      );
    }

    const hashedPassword = await this.userDomain.hashPassword(dto.password);

    await this.userRepo.save({
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
    });
  }
}
