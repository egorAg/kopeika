import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UserStatus = 'active' | 'inactive' | 'blocked';
export type UserRegisteredVia = 'email' | 'phone';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  // аватарка как emoji-строка
  @Column({ nullable: true })
  avatarEmoji?: string;

  // статус (active/inactive/blocked)
  @Column({ type: 'varchar', default: 'active' })
  status: UserStatus;

  // как зарегистрирован (email или phone)
  @Column({ type: 'varchar' })
  registeredVia: UserRegisteredVia;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // последний вход
  @Column({ type: 'timestamptz', nullable: true })
  lastLoginAt?: Date;
}
