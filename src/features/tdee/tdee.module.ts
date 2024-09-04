import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TdeeController } from './tdee.controller';
import { TdeeService } from './tdee.service';
import { UserGoalEntity } from '../../entities/user-goal.entity';
import { UserTdeeEntity } from '../../entities/user-tdee.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTdeeEntity, UserEntity, UserGoalEntity]),
  ],
  providers: [TdeeService],
  controllers: [TdeeController],
  exports: [TdeeService],
})
export class TdeeModule {}