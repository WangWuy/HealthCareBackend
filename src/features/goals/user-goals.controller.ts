import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserGoalService } from './user-goals.service';
import { CreateUserGoalDto } from './dto/create-user-goal.dto';
import { UserGoalEntity } from '../../entities/user-goal.entity';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('api/user-goals')
@UseGuards(JwtAuthGuard)
export class UserGoalController {
  constructor(private readonly userGoalService: UserGoalService) { }

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
}