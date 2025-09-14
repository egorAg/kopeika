import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { email: string; password: string }): Promise<User>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
