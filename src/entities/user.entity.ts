import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { CommonEntity, STATUS } from './_common.entity';
import { UserTdeeEntity } from './user-tdee.entity';
import { FoodLogEntity } from './food-log.entity';
import { UserGoalEntity } from './user-goal.entity';

@Entity('users')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('varchar')
  google_id: string;

  @Column('varchar', {
    default: '',
  })
  first_name: string;

  @Column('varchar', {
    default: '',
  })
  last_name: string;

  @Column('varchar', {
    default: '',
  })
  avatar: string;

  @Column({ default: true })
  status: STATUS.ACTIVE;

  @OneToMany(() => UserTdeeEntity, userTDEE => userTDEE.user)
  tdees: UserTdeeEntity[];

  @OneToMany(() => FoodLogEntity, foodLog => foodLog.user)
  food_logs: FoodLogEntity[];

  @OneToOne(() => UserGoalEntity, userGoal => userGoal.user)
  current_goal: UserGoalEntity;
}
