import { Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { TdeeService } from './tdee.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('api/tdee')
@UseGuards(JwtAuthGuard)
export class TdeeController {
  constructor(private readonly tdeeService: TdeeService) { }

  @Get(':userId')
  async getUserTdeeAndRecommendation(@Param('userId') userId: number) {
    return this.tdeeService.getUserTdeeAndRecommendation(userId);
  }

  @Get('history/:userId')
  async getTdeeHistory(@Param('userId') userId: number) {
    return this.tdeeService.getTdeeHistory(userId);
  }

  @Post('recalculate/:userId')
  async recalculateTdee(@Param('userId') userId: number) {
    return this.tdeeService.recalculateAndSaveTdee(userId);
  }

  @Get('nutrition-recommendation/:userId')
  async getNutritionRecommendation(@Param('userId') userId: number) {
    return this.tdeeService.calculateNutritionRecommendation(userId);
  }
}