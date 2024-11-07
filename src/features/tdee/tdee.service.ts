import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, GoalType, RateType, UserGoalEntity } from 'src/entities/user-goal.entity';
import { UserTdeeEntity } from 'src/entities/user-tdee.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MealDistribution, NutritionRecommendation } from 'src/interfaces/nutrition.interface';
import { Repository } from 'typeorm';
import { NutritionRecommendationDto, TdeeResponseDto, MealDistributionDto } from 'src/dto/tdee-response.dto';

@Injectable()
export class TdeeService {
  constructor(
    @InjectRepository(UserTdeeEntity)
    private userTdeeRepository: Repository<UserTdeeEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async calculateAndSaveTdee(user: UserEntity, userGoal: UserGoalEntity): Promise<UserTdeeEntity> {
    const { bmr, tdee, adjustedTdee } = this.calculateBMRAndTDEE(userGoal);

    const userTdee = this.userTdeeRepository.create({
      user,
      bmr,
      tdee,
      adjusted_tdee: adjustedTdee,
    });

    return this.userTdeeRepository.save(userTdee);
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

  async calculateNutritionRecommendation(userId: number): Promise<NutritionRecommendationDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['current_goal'],
    });

    if (!user || !user.current_goal) {
      throw new NotFoundException('User or user goal not found');
    }

    const tdee = await this.getLatestTdee(userId);
    const { goal_type } = user.current_goal;

    let total_calories = tdee;
    if (goal_type === GoalType.LOSE_WEIGHT) {
      total_calories -= 500; // Deficit for weight loss
    } else if (goal_type === GoalType.GAIN_WEIGHT) {
      total_calories += 500; // Surplus for weight gain
    }

    // Calculate macronutrient ratios (example: 30% protein, 35% carbs, 35% fat)
    const proteinCalories = total_calories * 0.3;
    const carbCalories = total_calories * 0.35;
    const fatCalories = total_calories * 0.35;

    return {
      total_calories,
      protein: Math.round(proteinCalories / 4), // 4 calories per gram of protein
      carbs: Math.round(carbCalories / 4), // 4 calories per gram of carbs
      fat: Math.round(fatCalories / 9), // 9 calories per gram of fat
      meal_distribution: this.calculateMealDistribution(total_calories),
    };
  }

  async getUserTdeeAndRecommendation(userId: number): Promise<TdeeResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['current_goal'],
    });

    if (!user || !user.current_goal) {
      throw new NotFoundException('User or user goal not found');
    }

    let tdee = await this.getLatestTdee(userId);
    if (!tdee) {
      // Nếu không có TDEE, tính toán mới
      const result = await this.recalculateAndSaveTdee(userId);
      tdee = result.tdee;
    }

    const recommendation = await this.calculateNutritionRecommendation(userId);
    return { tdee, recommendation };
  }

  private calculateMealDistribution(total_calories: number): MealDistributionDto {
    return {
      breakfast: Math.round(total_calories * 0.3),
      lunch: Math.round(total_calories * 0.35),
      dinner: Math.round(total_calories * 0.25),
      snacks: Math.round(total_calories * 0.1),
    };
  }

  private calculateBMRAndTDEE(userGoal: UserGoalEntity): { bmr: number; tdee: number; adjustedTdee: number } {
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

    let adjustedTdee = tdee;
    if (userGoal.goal_type !== GoalType.MAINTAIN_WEIGHT) {
      const calorieAdjustment = this.getCalorieAdjustment(userGoal.rate);
      adjustedTdee = userGoal.goal_type === GoalType.LOSE_WEIGHT
        ? tdee - calorieAdjustment
        : tdee + calorieAdjustment;
    }

    return { bmr, tdee, adjustedTdee };
  }

  private getCalorieAdjustment(rate: RateType): number {
    switch (rate) {
      case RateType.FAST:
        return 1000; // 1 kg per week
      case RateType.MEDIUM:
        return 500; // 0.5 kg per week
      case RateType.SLOW:
        return 250; // 0.25 kg per week
      default:
        return 500; // Default to balanced rate
    }
  }
}