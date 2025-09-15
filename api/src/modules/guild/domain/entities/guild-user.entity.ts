import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { Guild } from './guild.entity';

@Entity('guild_users')
export class GuildUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Guild, (guild) => guild.users, { onDelete: 'CASCADE' })
  guild: Guild;

  @ManyToOne(() => User, (user) => user.guilds, { onDelete: 'CASCADE' })
  user: User;
}
