import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterIntakeEntity } from 'src/entities/water-intake.entity';
import { UserEntity } from 'src/entities/user.entity';
import { WaterIntakeService } from './water-intake.service';
import { WaterIntakeController } from './water-intake.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WaterIntakeEntity, UserEntity])],
  providers: [WaterIntakeService],
  controllers: [WaterIntakeController],
  exports: [WaterIntakeService],
})
export class WaterIntakeModule {}