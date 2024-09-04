import { Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { TdeeService } from './tdee.service';
import { AuthGuard } from '@nestjs/passport';
import { UserGoalService } from '../goals/user-goals.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('api/tdee')
@UseGuards(JwtAuthGuard)
export class TdeeController {
  constructor(private readonly tdeeService: TdeeService) { }

  @Get(':userId')
  async getLatestTdee(@Param('userId') userId: number) {
    const tdee = await this.tdeeService.getLatestTdee(userId);
    return { tdee };
  }

  @Get('history/:userId')
  async getTdeeHistory(@Param('userId') userId: number) {
    return this.tdeeService.getTdeeHistory(userId);
  }

  @Post('recalculate/:userId')
  async recalculateTdee(@Param('userId') userId: number) {
    return this.tdeeService.recalculateAndSaveTdee(userId);
  }
}