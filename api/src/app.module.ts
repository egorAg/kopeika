import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env'],
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
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
