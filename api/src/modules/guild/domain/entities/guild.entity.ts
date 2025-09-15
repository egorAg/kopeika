import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GuildUser } from './guild-user.entity';
import { GuildBalanceHistory } from './guild-balance-history.entity';

@Entity('guilds')
export class Guild {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int', default: 1000 })
  dailyMinAmount: number;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @OneToMany(() => GuildUser, (gu) => gu.guild)
  users: GuildUser[];

  @OneToMany(() => GuildBalanceHistory, (h) => h.guild)
  history: GuildBalanceHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
