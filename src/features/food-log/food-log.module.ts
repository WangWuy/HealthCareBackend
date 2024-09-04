import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodLogService } from './food-log.service';
import { FoodLogController } from './food-log.controller';
import { FoodLogEntity } from 'src/entities/food-log.entity';
import { FoodEntity } from 'src/entities/food.entity';
import { UserEntity } from 'src/entities/user.entity';
import { TdeeModule } from '../tdee/tdee.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([FoodLogEntity, FoodEntity, UserEntity]),
      TdeeModule,
    ],
    providers: [FoodLogService],
    controllers: [FoodLogController],
    exports: [FoodLogService],
  })
  export class FoodLogModule {}