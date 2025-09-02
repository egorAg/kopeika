import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { UserInfo } from './user-info.entity';
import { UserDevice } from './user-device.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserInfo, (info) => info.user, { cascade: true })
    info: UserInfo;

    @OneToMany(() => UserDevice, (device) => device.user, { cascade: true })
    devices: UserDevice[];
}
