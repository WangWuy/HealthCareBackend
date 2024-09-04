import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGoalService } from './user-goals.service';
import { UserGoalController } from './user-goals.controller';
import { UserGoalEntity } from 'src/entities/user-goal.entity';
import { TdeeModule } from '../tdee/tdee.module';
import { UserEntity } from 'src/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserGoalEntity, UserEntity]),
        TdeeModule,
    ],
    providers: [UserGoalService],
    controllers: [UserGoalController],
    exports: [UserGoalService],
})
export class UserGoalModule {}