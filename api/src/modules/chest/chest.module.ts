import { CreateChestUseCase } from './application/usecases/create-chest.usecase';
import { CreateChestController } from './interfaces/controllers/create-chest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Chest } from './domain/entities/chest.entity';
import { CHEST_REPOSITORY } from './domain/repositories/chest.repository';
import { ChestTypeormRepository } from './infrastructure/chest.typeorm.repository';
import { GuildModule } from '../guild/guild.module';
import { GetChestsController } from './interfaces/controllers/get-chests.controller';
import { GetChestsUseCase } from './application/usecases/get-chests.usecase';
import { GetChestByIdController } from './interfaces/controllers/get-chest-by-id.controller';
import { UpdateChestController } from './interfaces/controllers/update-chest.controller';
import { UpdateChestUseCase } from './application/usecases/update-chest.usecase';
import { DeleteChestController } from './interfaces/controllers/delete-chest.controller';
import { DeleteChestUseCase } from './application/usecases/delete-chest.usecase';
import { GetChestByIdUseCase } from './application/usecases/get-chest-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Chest]), GuildModule],
  controllers: [
    CreateChestController,
    GetChestsController,
    GetChestByIdController,
    UpdateChestController,
    DeleteChestController,
  ],
  providers: [
    { provide: CHEST_REPOSITORY, useClass: ChestTypeormRepository },
    CreateChestUseCase,
    GetChestsUseCase,
    GetChestByIdUseCase,
    UpdateChestUseCase,
    DeleteChestUseCase,
  ],
  exports: [CHEST_REPOSITORY],
})
export class ChestModule {}
