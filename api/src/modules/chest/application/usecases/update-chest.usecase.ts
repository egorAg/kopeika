import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { IChestRepository } from '../../domain/repositories/chest.repository';
import { CHEST_REPOSITORY } from '../../domain/repositories/chest.repository';
import { UpdateChestDto } from '../../interfaces/dtos/update-chest.dto';
import { Chest } from '../../domain/entities/chest.entity';

@Injectable()
export class UpdateChestUseCase {
  constructor(
    @Inject(CHEST_REPOSITORY) private readonly chests: IChestRepository,
  ) {}

  async execute(
    chestId: string,
    userId: string,
    dto: UpdateChestDto,
  ): Promise<Chest> {
    const chest = await this.chests.findById(chestId);
    if (!chest) throw new NotFoundException('Сундук не найден');

    const isMember = chest.guild?.users?.some((gu) => gu.user.id === userId);
    if (!isMember) throw new ForbiddenException('Нет доступа к этому сундуку');

    return this.chests.update(chestId, dto);
  }
}
