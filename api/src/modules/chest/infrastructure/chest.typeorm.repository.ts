import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chest } from '../domain/entities/chest.entity';
import type { IChestRepository } from '../domain/repositories/chest.repository';

@Injectable()
export class ChestTypeormRepository implements IChestRepository {
  constructor(
    @InjectRepository(Chest)
    private readonly repo: Repository<Chest>,
  ) {}

  async findById(id: string): Promise<Chest | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['guild'],
    });
  }

  async findByGuildId(guildId: string): Promise<Chest[]> {
    return this.repo.find({
      where: { guild: { id: guildId } },
    });
  }

  async create(data: Partial<Chest>): Promise<Chest> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: string, data: Partial<Chest>): Promise<Chest> {
    await this.repo.update(id, data);
    const result = await this.findById(id);
    return result as Chest;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
