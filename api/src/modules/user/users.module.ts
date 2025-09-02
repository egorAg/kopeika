import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserDevice } from './domain/entities/user-device.entity';
import { UserInfo } from './domain/entities/user-info.entity';
import { RegisterUserController } from './application/usecases/RegisterUser/RegisterUser.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserDomainService } from './domain/services/user-domain.service';
import { RegisterUserUsecase } from './application/usecases/RegisterUser/RegisterUser.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDevice, UserInfo])],
  providers: [UserRepository, UserDomainService, RegisterUserUsecase],
  controllers: [RegisterUserController],
})
export class UsersModule {}
