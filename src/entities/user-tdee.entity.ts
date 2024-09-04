import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonEntity } from './_common.entity';

@Entity('user_tdee')
export class UserTdeeEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.tdees)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column('float')
  tdee: number;

  @Column('float')
  bmr: number; 
}