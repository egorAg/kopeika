import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { IChestRepository } from '../../domain/repositories/chest.repository';
import { CHEST_REPOSITORY } from '../../domain/repositories/chest.repository';

@Injectable()
export class GetChestByIdUseCase {
  constructor(
    @Inject(CHEST_REPOSITORY) private readonly chests: IChestRepository,
  ) {}

  async execute(chestId: string, userId: string) {
    const chest = await this.chests.findById(chestId);
    if (!chest) throw new NotFoundException('Сундук не найден');

    const isMember = chest.guild?.users?.some((gu) => gu.user.id === userId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этому сундуку');

    return chest;
  }
}
