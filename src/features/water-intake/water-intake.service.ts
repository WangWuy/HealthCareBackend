import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WaterIntakeEntity } from 'src/entities/water-intake.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class WaterIntakeService {
  constructor(
    @InjectRepository(WaterIntakeEntity)
    private waterIntakeRepository: Repository<WaterIntakeEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async logWaterIntake(userId: number, amount: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const waterIntake = this.waterIntakeRepository.create({
      user,
      amount,
      logged_at: new Date(),
    });

    return this.waterIntakeRepository.save(waterIntake);
  }

  async getDailyWaterIntake(userId: number, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const waterIntakes = await this.waterIntakeRepository.find({
      where: {
        user: { id: userId },
        logged_at: Between(startOfDay, endOfDay),
      },
    });

    const totalAmount = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0);

    return { totalAmount, intakes: waterIntakes };
  }
}