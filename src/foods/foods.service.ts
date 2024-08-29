import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FoodsEntity } from 'src/entities/foods.entity';

@Injectable()
export class FoodsService {
    constructor(
        @InjectRepository(FoodsEntity)
        private FoodsRepository: Repository<FoodsEntity>,
    ) {}

    async create(Food: Partial<FoodsEntity>): Promise<FoodsEntity> {
        return this.FoodsRepository.save(Food);
    }

    async findAll(): Promise<FoodsEntity[]> {
        return this.FoodsRepository.find();
    }

    async findOne(id: number): Promise<FoodsEntity> {
        return this.FoodsRepository.findOneBy({ id });
    }

    async update(id: number, Food: Partial<FoodsEntity>): Promise<FoodsEntity> {
        await this.FoodsRepository.update(id, Food);
        return this.FoodsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.FoodsRepository.delete(id);
    }
}
