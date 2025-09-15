import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guild } from '../../../guild/domain/entities/guild.entity';

export type ChestType =
  | 'debit'
  | 'creditCard'
  | 'saving'
  | 'credit'
  | 'installment'
  | 'microloan';

@Entity('chests')
export class Chest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Guild, (guild) => guild.chests, { onDelete: 'CASCADE' })
  guild: Guild;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  type: ChestType;

  @Column({ type: 'varchar', default: 'RUB' })
  currency: 'RUB' | 'USD' | 'EUR' | 'CNY';

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  // для кредитных сундуков
  @Column({ type: 'numeric', nullable: true })
  creditLimit?: number;

  @Column({ type: 'numeric', nullable: true })
  currentDebt?: number;

  @Column({ type: 'int', nullable: true })
  gracePeriodDays?: number;

  // для накопительных сундуков
  @Column({ type: 'numeric', nullable: true })
  goalAmount?: number;

  @Column({ type: 'timestamptz', nullable: true })
  goalDeadline?: Date;

  // для кредитов/рассрочек/микрозаймов
  @Column({ type: 'numeric', nullable: true })
  monthlyPayment?: number;

  @Column({ type: 'numeric', nullable: true })
  percent?: number;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
