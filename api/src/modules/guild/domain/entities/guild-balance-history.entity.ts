import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Guild } from './guild.entity';

@Entity('guild_balance_history')
export class GuildBalanceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Guild, (guild) => guild.history, { onDelete: 'CASCADE' })
  guild: Guild;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'numeric' })
  balance: number;
}
