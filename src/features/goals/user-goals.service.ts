import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGoalEntity } from '../../entities/user-goal.entity';
import { CreateUserGoalDto } from './dto/create-user-goal.dto';
import { UserEntity } from 'src/entities/user.entity';
import { TdeeService } from '../tdee/tdee.service';

@Injectable()
export class UserGoalService {
  constructor(
    @InjectRepository(UserGoalEntity)
    private userGoalRepository: Repository<UserGoalEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private tdeeService: TdeeService,
  ) { }

  async createUserGoal(userId: number, userGoalData: Partial<UserGoalEntity>) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userGoal = this.userGoalRepository.create({
      ...userGoalData,
      user,
    });
    await this.userGoalRepository.save(userGoal);

    // Calculate and save TDEE
    await this.tdeeService.calculateAndSaveTdee(user, userGoal);

    // Update user's current goal
    user.current_goal = userGoal;
    await this.userRepository.save(user);

    return userGoal;
  }

  async getUserGoal(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['current_goal'],
    });
    if (!user || !user.current_goal) {
      throw new NotFoundException('User goal not found');
    }
    return user.current_goal;
  }

  async updateUserGoal(userId: number, userGoalData: Partial<UserGoalEntity>) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['current_goal'],
    });
    if (!user || !user.current_goal) {
      throw new NotFoundException('User goal not found');
    }

    Object.assign(user.current_goal, userGoalData);
    await this.userGoalRepository.save(user.current_goal);

    // Recalculate TDEE
    await this.tdeeService.calculateAndSaveTdee(user, user.current_goal);

    return user.current_goal;
  }
}