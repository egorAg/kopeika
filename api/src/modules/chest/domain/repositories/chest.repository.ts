import { Chest } from '../entities/chest.entity';

export interface IChestRepository {
  findById(id: string): Promise<Chest | null>;
  findByGuildId(guildId: string): Promise<Chest[]>;
  create(data: Partial<Chest>): Promise<Chest>;
  update(id: string, data: Partial<Chest>): Promise<Chest>;
  delete(id: string): Promise<void>;
}

export const CHEST_REPOSITORY = Symbol('CHEST_REPOSITORY');
