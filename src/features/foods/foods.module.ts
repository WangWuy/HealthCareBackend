import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../../entities/food.entity';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  providers: [FoodsService],
  controllers: [FoodsController],
  exports: [FoodsService],
})
export class FoodsModule {}