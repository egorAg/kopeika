import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserTypeormRepository } from './infrastructure/repositories/user.typeorm.repository';
import { UserDomainService } from './domain/services/user-domain.service';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { UserMeController } from './interfaces/controllers/user-me.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserMeController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserTypeormRepository },
    UserDomainService,
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
