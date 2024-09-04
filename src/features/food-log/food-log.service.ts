import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FoodLogEntity } from '../../entities/food-log.entity';
import { FoodEntity } from '../../entities/food.entity';
import { TdeeService } from '../tdee/tdee.service';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class FoodLogService {
    constructor(
        @InjectRepository(FoodLogEntity)
        private foodLogRepository: Repository<FoodLogEntity>,
        @InjectRepository(FoodEntity)
        private foodRepository: Repository<FoodEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private tdeeService: TdeeService,
    ) { }

    async logFood(user_id: number, food_id: number, amount: number, mealType: string) {
        const user = await this.userRepository.findOne({ where: { id: user_id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const food = await this.foodRepository.findOne({ where: { id: food_id } });
        if (!food) {
            throw new NotFoundException('Food not found');
        }

        const servingRatio = amount / food.serving_size;

        const foodLog = this.foodLogRepository.create({
            user,
            food,
            amount,
            calories: food.calories * servingRatio,
            protein: food.protein * servingRatio,
            carbs: food.carbs * servingRatio,
            fat: food.fat * servingRatio,
            meal_type: mealType,
            logged_at: new Date(),
        });

        return this.foodLogRepository.save(foodLog);
    }

    async getDailyFoodLog(userId: number, date: Date) {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        return this.foodLogRepository.find({
            where: {
                user: { id: userId },
                logged_at: Between(startOfDay, endOfDay),
            },
            relations: ['food'],
        });
    }

    async getDailyNutrition(userId: number, date: Date) {
        const dailyLogs = await this.getDailyFoodLog(userId, date);
        const nutrition = dailyLogs.reduce((acc, log) => ({
            calories: acc.calories + log.calories,
            protein: acc.protein + log.protein,
            carbs: acc.carbs + log.carbs,
            fat: acc.fat + log.fat,
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['current_goal'],
        });

        const latestTdee = await this.tdeeService.getLatestTdee(userId);

        return {
            ...nutrition,
            goal: user.current_goal,
            tdee: latestTdee,
        };
    }

    async deleteFoodLog(userId: number, logId: number) {
        const foodLog = await this.foodLogRepository.findOne({
            where: { id: logId, user: { id: userId } },
        });
        if (!foodLog) {
            throw new NotFoundException('Food log not found');
        }
        await this.foodLogRepository.remove(foodLog);
        return { message: 'Food log deleted successfully' };
    }
}