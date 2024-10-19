import { Controller, Post, Get, Body, Query, UseGuards, Param } from '@nestjs/common';
import { WaterIntakeService } from './water-intake.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('api/water-intakes')
@UseGuards(JwtAuthGuard)
export class WaterIntakeController {
  constructor(private readonly waterIntakeService: WaterIntakeService) {}

  @Post(':userId')
  logWaterIntake(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return this.waterIntakeService.logWaterIntake(userId, amount);
  }

  @Get('daily/:userId')
  getDailyWaterIntake(
    @Param('userId') userId: number,
    @Query('date') date: string,
  ) {
    return this.waterIntakeService.getDailyWaterIntake(userId, new Date(date));
  }
}