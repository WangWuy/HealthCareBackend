import { IsNotEmpty, IsInt, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateUserGoalDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  goal_type: number;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;

  @IsNotEmpty()
  @IsNumber()
  target_weight: number;

  @IsNotEmpty()
  @IsInt()
  rate: number;

  @IsNotEmpty()
  @IsInt()
  activity_level: number;
}