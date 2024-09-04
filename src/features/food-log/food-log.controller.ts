import { Controller, Post, Get, Body, Query, UseGuards, Param, Delete } from '@nestjs/common';
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
    getDailyFoodLog(
        @Param('userId') userId: number,
        @Query('date') date: string
    ) {
        return this.foodLogService.getDailyFoodLog(userId, new Date(date));
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