import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  // храним ТОЛЬКО хэш random-части refresh-токена
  @Column()
  refreshTokenHash: string;

  @Column({ default: true })
  isActive: boolean;

  // аудит (необязательно, но полезно)
  @Column({ nullable: true })
  ip?: string;

  @Column({ nullable: true })
  userAgent?: string;

  // TTL для refresh (например, 30 дней)
  @Column({ type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  // последний успешный refresh
  @Column({ type: 'timestamptz', nullable: true })
  lastUsedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
