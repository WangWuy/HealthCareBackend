import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserGoalService } from './user-goals.service';
import { GoalType, UserGoalEntity } from '../../entities/user-goal.entity';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { TdeeService } from '../tdee/tdee.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user-goals')
@ApiBearerAuth()
@Controller('api/user-goals')
@UseGuards(JwtAuthGuard)
export class UserGoalController {
  constructor(
    private readonly userGoalService: UserGoalService,
    private tdeeService: TdeeService,
  ) { }

  @ApiOperation({ summary: 'Tạo mục tiêu tập luyện mới cho người dùng' })
  @Post('create/:userId')
  createUserGoal(
    @Param('userId') userId: number,
    @Body() userGoalData: Partial<UserGoalEntity>
  ) {
    return this.userGoalService.createUserGoal(userId, userGoalData);
  }

  @ApiOperation({ summary: 'Xem chi tiết mục tiêu tập luyện của người dùng' })
  @Get('detail/:userId')
  getUserGoal(@Param('userId') userId: number) {
    return this.userGoalService.getUserGoal(userId);
  }

  @ApiOperation({ summary: 'Cập nhật mục tiêu tập luyện của người dùng' })
  @Put(':userId')
  updateUserGoal(
    @Param('userId') userId: number,
    @Body() userGoalData: Partial<UserGoalEntity>
  ) {
    return this.userGoalService.updateUserGoal(userId, userGoalData);
  }

  @ApiOperation({ summary: 'Lấy khuyến nghị lượng calo cần nạp dựa trên mục tiêu và TDEE' })
  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: number) {
    const userGoal = await this.userGoalService.getUserGoal(userId);
    const tdee = await this.tdeeService.getLatestTdee(userId);

    let recommendation = '';
    switch (userGoal.goal_type) {
      case GoalType.LOSE_WEIGHT:
        recommendation = `Để giảm cân, bạn nên nạp ${tdee - 250} calo mỗi ngày.`;
        break;
      case GoalType.GAIN_WEIGHT:
        recommendation = `Để tăng cân, bạn nên nạp ${tdee + 250} calo mỗi ngày.`;
        break;
      case GoalType.MAINTAIN_WEIGHT:
        recommendation = `Để duy trì cân nặng, bạn nên nạp ${tdee} calo mỗi ngày.`;
        break;
    }

    return { recommendation, tdee };
  }
}