import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RegisterController } from './interfaces/controllers/register.controller';
import { RegisterUseCase } from './application/usecases/register.usecase';

import { PasswordService } from './domain/services/password.service';
import { User } from '../user/domain/entities/user.entity';
import { UserTypeormRepository } from '../user/infrastructure/repositories/user.typeorm.repository';
import { USER_REPOSITORY } from '../user/domain/repositories/user.repository';
import { AUTH_SESSION_REPOSITORY } from './domain/repositories/auth-session.repository';
import { AuthSessionTypeormRepository } from './infrastructure/repositories/auth-session.typeorm.repository';
import { AuthSession } from './domain/entities/auth-session.entity';
import { LoginController } from './interfaces/controllers/login.controller';
import { LoginUseCase } from './application/usecases/login.usecase';
import { TokenService } from './domain/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshHashService } from './domain/services/refresh-hash.service';
import { RefreshUseCase } from './application/usecases/refresh.usecase';
import { RefreshController } from './interfaces/controllers/refresh.controller';
import { LogoutController } from './interfaces/controllers/logout.controller';
import { LogoutUseCase } from './application/usecases/logout.usecase';
import { LogoutAllExceptCurrentController } from './interfaces/controllers/logout-all-except-current.controller';
import { LogoutAllExceptCurrentUseCase } from './application/usecases/logout-all-except-current.usecase';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_EXPIRES', '15m'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User, AuthSession]),
  ],
  controllers: [
    RegisterController,
    LoginController,
    RefreshController,
    LogoutController,
    LogoutAllExceptCurrentController,
  ],
  providers: [
    PasswordService,
    TokenService,
    RefreshHashService,
    RegisterUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    LogoutAllExceptCurrentUseCase,
    { provide: USER_REPOSITORY, useClass: UserTypeormRepository },
    {
      provide: AUTH_SESSION_REPOSITORY,
      useClass: AuthSessionTypeormRepository,
    },
  ],
})
export class AuthModule {}
