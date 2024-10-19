import { GoalType, RateType, Gender } from '../entities/user-goal.entity';

export interface UserGoal {
  goalType: GoalType;
  gender: Gender;
  age: number;
  weight: number;
  target_weight: number;
  rate: RateType;
  activity_level: number;
  height: number;
}