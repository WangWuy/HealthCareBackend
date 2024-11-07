import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, Min, IsUrl } from 'class-validator';
import { STATUS, TYPE_FOOD } from '../entities/_common.entity';

export class CreateFoodDto {
    @ApiProperty({
        description: 'Tên món ăn',
        example: 'Cơm gà',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Đường dẫn ảnh món ăn',
        example: 'https://example.com/com-ga.jpg',
        required: true,
    })
    @IsUrl()
    avatar: string;

    @ApiProperty({
        description: 'Số calories trong món ăn',
        example: 250.5,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    calories: number;

    @ApiProperty({
        description: 'Lượng protein (g)',
        example: 15.5,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    protein: number;

    @ApiProperty({
        description: 'Lượng carbs (g)',
        example: 30.5,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    carbs: number;

    @ApiProperty({
        description: 'Lượng chất béo (g)',
        example: 8.5,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    fat: number;

    @ApiProperty({
        description: 'Loại thức ăn',
        enum: TYPE_FOOD,
        example: TYPE_FOOD.ADMIN_FOOD,
        default: TYPE_FOOD.ADMIN_FOOD,
    })
    @IsEnum(TYPE_FOOD)
    @IsOptional()
    food_type?: TYPE_FOOD;

    @ApiProperty({
        description: 'Trạng thái món ăn',
        enum: STATUS,
        example: STATUS.ACTIVE,
        default: STATUS.ACTIVE,
    })
    @IsEnum(STATUS)
    @IsOptional()
    status?: STATUS;

    @ApiProperty({
        description: 'ID người tạo món ăn',
        example: 1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    create_by_id?: number;

    @ApiProperty({
        description: 'Đơn vị khẩu phần',
        example: 'gram',
        default: 'gram',
    })
    @IsString()
    @IsOptional()
    serving_unit?: string;

    @ApiProperty({
        description: 'Kích thước khẩu phần',
        example: 100,
        default: 100,
        minimum: 0,
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    serving_size?: number;
}