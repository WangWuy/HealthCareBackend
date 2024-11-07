import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { FoodEntity } from 'src/entities/food.entity';
import { FoodsService } from './foods.service';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { FoodListResponse, FoodResponse } from 'src/response/food.response';
import { CreateFoodDto } from 'src/dto/create-food.dto';
import { PaginationQueryDto, PaginationResponseDto } from 'src/dto/pagination-query.dto';

@ApiTags('foods')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/foods')
export class FoodsController {
    constructor(private readonly foodRepository: FoodsService) { }

    @Post('/create')
    @ApiOperation({ summary: 'Tạo món ăn mới' })
    @ApiOkResponse({
        type: FoodResponse
    })
    async create(@Body() createFoodDto: CreateFoodDto): Promise<FoodResponse> {
        return this.foodRepository.create(createFoodDto);
    }

    @Get('')
    @ApiOperation({ summary: 'Lấy danh sách món ăn' })
    @ApiOkResponse({
        type: PaginationResponseDto,
    })
    async findAll(@Query() query: PaginationQueryDto): Promise<PaginationResponseDto<FoodResponse>> {
        return this.foodRepository.findAll(query);
    }

    @Get('detail/:id')
    async findOne(@Param('id') id: number): Promise<FoodEntity> {
        return this.foodRepository.findOne(id);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body() updateFoodDto: Partial<FoodEntity>,
    ): Promise<FoodEntity> {
        return this.foodRepository.update(id, updateFoodDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.foodRepository.remove(id);
    }
}
