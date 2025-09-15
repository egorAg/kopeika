import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UserTypeormRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByPhone(phone: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: { email: string; password: string }) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }
}
