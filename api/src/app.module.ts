import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedAuthModule } from '@shared/auth/shared-auth.module';
import { GuildModule } from './modules/guild/guild.module';
import { UserStatusInterceptor } from './modules/auth/interceptors/user-status.interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ChestModule } from './modules/chest/chest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST', 'db'),
        port: parseInt(config.get<string>('DB_PORT', '5440')),
        username: config.get<string>('POSTGRES_USER', 'kopeika'),
        password: config.get<string>('POSTGRES_PASSWORD', 'kopeika'),
        database: config.get<string>('POSTGRES_DB', 'kopeika'),
        entities: ['./modules/domain/entities/*.ts'],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    AuthModule,
    SharedAuthModule,
    UsersModule,
    GuildModule,
    ChestModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserStatusInterceptor,
    },
  ],
})
export class AppModule {}
