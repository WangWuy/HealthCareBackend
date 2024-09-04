import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FoodEntity } from 'src/entities/food.entity';

@Injectable()
export class FoodsService {
    constructor(
        @InjectRepository(FoodEntity)
        private FoodsRepository: Repository<FoodEntity>,
    ) {}

    async create(Food: Partial<FoodEntity>): Promise<FoodEntity> {
        return this.FoodsRepository.save(Food);
    }

    async findAll(): Promise<FoodEntity[]> {
        return this.FoodsRepository.find();
    }

    async findOne(id: number): Promise<FoodEntity> {
        return this.FoodsRepository.findOneBy({ id });
    }

    async update(id: number, Food: Partial<FoodEntity>): Promise<FoodEntity> {
        await this.FoodsRepository.update(id, Food);
        return this.FoodsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.FoodsRepository.delete(id);
    }
}
