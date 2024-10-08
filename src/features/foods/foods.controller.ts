import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FoodEntity } from 'src/entities/food.entity';
import { FoodsService } from './foods.service';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('USER V1')
@Controller('api/foods')
export class FoodsController {
    constructor(private readonly FoodsService: FoodsService) { }

    @Post('create')
    async create(@Body() createFoodDto: Partial<FoodEntity>): Promise<FoodEntity> {
        return this.FoodsService.create(createFoodDto);
    }

    @Get()
    async findAll(): Promise<FoodEntity[]> {
        return this.FoodsService.findAll();
    }

    @Get('detail/:id')
    async findOne(@Param('id') id: number): Promise<FoodEntity> {
        return this.FoodsService.findOne(id);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body() updateFoodDto: Partial<FoodEntity>,
    ): Promise<FoodEntity> {
        return this.FoodsService.update(id, updateFoodDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.FoodsService.remove(id);
    }
}

function UsePrefix(arg0: string): (target: typeof FoodsController) => void | typeof FoodsController {
    throw new Error('Function not implemented.');
}
