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
import { GetGuildsController } from './interfaces/controllers/get-guilds.controller';
import { GetGuildsUseCase } from './application/usecases/get-guilds.usecase';
import { GetGuildByIdController } from './interfaces/controllers/get-guild-by-id.controller';
import { GetGuildByIdUseCase } from './application/usecases/get-guild-by-id.usecase';
import { UpdateGuildController } from './interfaces/controllers/update-guild.controller';
import { UpdateGuildUseCase } from './application/usecases/update-guild.usecase';
import { DeleteGuildController } from './interfaces/controllers/delete-guild.controller';
import { DeleteGuildUseCase } from './application/usecases/delete-guild.usecase';
import { AddGuildUserController } from './interfaces/controllers/add-guild-user.controller';
import { AddGuildUserUseCase } from './application/usecases/add-guild-user.usecase';
import { RemoveGuildUserUseCase } from './application/usecases/remove-guild-user.usecase';
import { RemoveGuildUserController } from './interfaces/controllers/remove-guild-user.controller';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Guild, GuildUser, GuildBalanceHistory]),
  ],
  controllers: [
    CreateGuildController,
    GetGuildsController,
    GetGuildByIdController,
    UpdateGuildController,
    DeleteGuildController,
    AddGuildUserController,
    RemoveGuildUserController,
  ],
  providers: [
    CreateGuildUseCase,
    GetGuildsUseCase,
    GetGuildByIdUseCase,
    UpdateGuildUseCase,
    DeleteGuildUseCase,
    AddGuildUserUseCase,
    RemoveGuildUserUseCase,
    { provide: GUILD_REPOSITORY, useClass: GuildTypeormRepository },
    { provide: GUILD_USER_REPOSITORY, useClass: GuildUserTypeormRepository },
  ],
  exports: [GUILD_REPOSITORY],
})
export class GuildModule {}
