import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsEntity } from '../entities/foods.entity';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FoodsEntity])],
  providers: [FoodsService],
  controllers: [FoodsController],
  exports: [FoodsService],
})
export class FoodsModule {}