import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guild } from './domain/entities/guild.entity';
import { GuildUser } from './domain/entities/guild-user.entity';
import { GuildBalanceHistory } from './domain/entities/guild-balance-history.entity';
import { GUILD_REPOSITORY } from './domain/repositories/guild.repository';
import { GUILD_USER_REPOSITORY } from './domain/repositories/guild-user.repository';
import { CreateGuildUseCase } from './application/usecases/create-guild.usecase';
import { CreateGuildController } from './interfaces/controllers/create-guild.controller';
import { GuildTypeormRepository } from './infrastructure/repositories/guild.typeorm.repository';
import { GuildUserTypeormRepository } from './infrastructure/repositories/guild-user.typeorm.repository';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Guild, GuildUser, GuildBalanceHistory]),
  ],
  controllers: [CreateGuildController],
  providers: [
    CreateGuildUseCase,
    { provide: GUILD_REPOSITORY, useClass: GuildTypeormRepository },
    { provide: GUILD_USER_REPOSITORY, useClass: GuildUserTypeormRepository },
  ],
})
export class GuildModule {}
