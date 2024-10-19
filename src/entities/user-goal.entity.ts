import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './_common.entity';
import { UserEntity } from './user.entity';

export enum GoalType {
  LOSE_WEIGHT = 1,
  GAIN_WEIGHT = 2,
  MAINTAIN_WEIGHT = 3,
}

export enum RateType {
  SLOW = 1,
  MEDIUM = 2,
  FAST = 3,
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('user_goals')
export class UserGoalEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.current_goal)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({
    type: 'enum',
    enum: GoalType,
    default: GoalType.MAINTAIN_WEIGHT
  })
  goal_type: GoalType;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @Column({ type: 'float', default: 0 })
  weight: number;

  @Column({ type: 'float', default: 0 })
  target_weight: number;

  @Column({ type: 'enum', enum: GoalType })
  rate: RateType;

  @Column()
  activity_level: number;

  @Column({ type: 'float' })
  height: number; // Thêm chiều cao để tính BMR chính xác hơn
}