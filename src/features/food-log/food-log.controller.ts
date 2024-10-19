import { Controller, Post, Get, Body, Query, UseGuards, Param, Delete, BadRequestException } from '@nestjs/common';
import { FoodLogService } from './food-log.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('api/food-logs')
@UseGuards(JwtAuthGuard)
export class FoodLogController {
    constructor(private readonly foodLogService: FoodLogService) { }

    @Post(':userId')
    logFood(
        @Param('userId') userId: number,
        @Body() logData: { foodId: number; amount: number; mealType: string }
    ) {
        return this.foodLogService.logFood(userId, logData.foodId, logData.amount, logData.mealType);
    }

    @Get('daily/:userId')
    async getDailyFoodLog(
        @Param('userId') userId: number,
        @Query('date') date: string,
        @Query('meal_type') mealType?: string
    ) {
        if (!date) {
            throw new BadRequestException('Date is required');
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new BadRequestException('Invalid date format');
        }

        return this.foodLogService.getDailyFoodLog(userId, parsedDate, mealType);
    }

    @Get('nutrition/:userId')
    getDailyNutrition(
        @Param('userId') userId: number,
        @Query('date') date: string
    ) {
        return this.foodLogService.getDailyNutrition(userId, new Date(date));
    }

    @Delete(':userId/:logId')
    deleteFoodLog(
        @Param('userId') userId: number,
        @Param('logId') logId: number
    ) {
        return this.foodLogService.deleteFoodLog(userId, logId);
    }
}