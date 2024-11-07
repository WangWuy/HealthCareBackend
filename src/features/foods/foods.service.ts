import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FoodEntity } from 'src/entities/food.entity';
import { PaginationQueryDto, PaginationResponseDto } from 'src/dto/pagination-query.dto';
import { FoodResponse } from 'src/response/food.response';
import { CreateFoodDto } from 'src/dto/create-food.dto';

@Injectable()
export class FoodsService {
    constructor(
        @InjectRepository(FoodEntity)
        private readonly foodRepository: Repository<FoodEntity>,
    ) { }

    async create(createFoodDto: CreateFoodDto): Promise<FoodResponse> {
        const foodEntity = this.foodRepository.create(createFoodDto);
        const savedFood = await this.foodRepository.save(foodEntity);
        
        const response = new FoodResponse();
        Object.assign(response, savedFood);
        return response;
    }

    async findAll(query: PaginationQueryDto): Promise<PaginationResponseDto<FoodResponse>> {
        const { page = 1, limit = 10, sort_by = 'created_at', sort_order = 'DESC', search } = query;

        const queryBuilder = this.foodRepository.createQueryBuilder('food')
            .leftJoinAndSelect('food.created_by', 'user');

        if (search) {
            queryBuilder.where('food.name LIKE :search', { search: `%${search}%` });
        }

        queryBuilder.orderBy(`food.${sort_by}`, sort_order);

        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        const [foods, total] = await queryBuilder.getManyAndCount();

        const foodResponses = foods.map(food => {
            const response = new FoodResponse();
            Object.assign(response, food);
            return response;
        });

        return new PaginationResponseDto<FoodResponse>(
            foodResponses,
            total,
            page,
            limit
        );
    }

    async findOne(id: number): Promise<FoodEntity> {
        return this.foodRepository.findOneBy({ id });
    }

    async update(id: number, Food: Partial<FoodEntity>): Promise<FoodEntity> {
        await this.foodRepository.update(id, Food);
        return this.foodRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.foodRepository.delete(id);
    }
}
