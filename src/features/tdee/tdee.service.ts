import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, UserGoalEntity } from 'src/entities/user-goal.entity';
import { UserTdeeEntity } from 'src/entities/user-tdee.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TdeeService {
  constructor(
    @InjectRepository(UserTdeeEntity)
    private userTdeeRepository: Repository<UserTdeeEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async calculateAndSaveTdee(user: UserEntity, userGoal: UserGoalEntity): Promise<UserTdeeEntity> {
    const { bmr, tdee } = this.calculateBMRAndTDEE(userGoal);
    
    const userTdee = this.userTdeeRepository.create({
      user,
      bmr,
      tdee,
    });

    return this.userTdeeRepository.save(userTdee);
  }

  private calculateBMRAndTDEE(userGoal: UserGoalEntity): { bmr: number; tdee: number } {
    let bmr = 0;
    if (userGoal.gender === Gender.MALE) {
      bmr = 88.362 + (13.397 * userGoal.target_weight) + (4.799 * userGoal.height) - (5.677 * userGoal.age);
    } else if (userGoal.gender === Gender.FEMALE) {
      bmr = 447.593 + (9.247 * userGoal.target_weight) + (3.098 * userGoal.height) - (4.330 * userGoal.age);
    } else {
      // For OTHER gender, use an average of male and female formulas
      bmr = (88.362 + (13.397 * userGoal.target_weight) + (4.799 * userGoal.height) - (5.677 * userGoal.age) +
             447.593 + (9.247 * userGoal.target_weight) + (3.098 * userGoal.height) - (4.330 * userGoal.age)) / 2;
    }

    const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9];
    const tdee = bmr * activityFactors[userGoal.activity_level - 1];

    return { bmr, tdee };
  }

  async getLatestTdee(userId: number): Promise<number | null> {
    const latestTdee = await this.userTdeeRepository.findOne({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });

    return latestTdee ? latestTdee.tdee : null;
  }

  async getTdeeHistory(userId: number): Promise<UserTdeeEntity[]> {
    return this.userTdeeRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  async recalculateAndSaveTdee(userId: number): Promise<UserTdeeEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['current_goal'],
    });

    if (!user || !user.current_goal) {
      throw new NotFoundException('User or user goal not found');
    }

    return this.calculateAndSaveTdee(user, user.current_goal);
  }
}