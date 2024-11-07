import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserGoalService } from './user-goals.service';
import { CreateUserGoalDto } from '../../dto/create-user-goal.dto';
import { GoalType, UserGoalEntity } from '../../entities/user-goal.entity';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { TdeeService } from '../tdee/tdee.service';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user-goals')
@ApiBearerAuth()
@Controller('api/user-goals')
@UseGuards(JwtAuthGuard)
export class UserGoalController {
  constructor(
    private readonly userGoalService: UserGoalService,
    private tdeeService: TdeeService,
  ) { }

  @Post('create/:userId')
  createUserGoal(
    @Param('userId') userId: number,
    @Body() userGoalData: Partial<UserGoalEntity>
  ) {
    return this.userGoalService.createUserGoal(userId, userGoalData);
  }

  @Get('detail/:userId')
  getUserGoal(@Param('userId') userId: number) {
    return this.userGoalService.getUserGoal(userId);
  }

  @Put(':userId')
  updateUserGoal(
    @Param('userId') userId: number,
    @Body() userGoalData: Partial<UserGoalEntity>
  ) {
    return this.userGoalService.updateUserGoal(userId, userGoalData);
  }

  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: number) {
    const userGoal = await this.userGoalService.getUserGoal(userId);
    const tdee = await this.tdeeService.getLatestTdee(userId);

    let recommendation = '';
    switch (userGoal.goal_type) {
      case GoalType.LOSE_WEIGHT:
        recommendation = `To lose weight, aim for a daily calorie intake of ${tdee - 250} calories.`;
        break;
      case GoalType.GAIN_WEIGHT:
        recommendation = `To gain weight, aim for a daily calorie intake of ${tdee + 250} calories.`;
        break;
      case GoalType.MAINTAIN_WEIGHT:
        recommendation = `To maintain your weight, aim for a daily calorie intake of ${tdee} calories.`;
        break;
    }

    return { recommendation, tdee };
  }
}