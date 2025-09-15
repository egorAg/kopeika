import { CreateChestUseCase } from './application/usecases/create-chest.usecase';
import { CreateChestController } from './interfaces/controllers/create-chest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Chest } from './domain/entities/chest.entity';
import { CHEST_REPOSITORY } from './domain/repositories/chest.repository';
import { ChestTypeormRepository } from './infrastructure/chest.typeorm.repository';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chest]), GuildModule],
  controllers: [CreateChestController],
  providers: [
    { provide: CHEST_REPOSITORY, useClass: ChestTypeormRepository },
    CreateChestUseCase,
  ],
  exports: [CHEST_REPOSITORY],
})
export class ChestModule {}
