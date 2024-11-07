import { ApiProperty } from '@nestjs/swagger';
import { STATUS, TYPE_FOOD } from '../entities/_common.entity';
import { UserResponse } from './user.response';

export class FoodResponse {
    @ApiProperty({
        description: 'ID món ăn',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Tên món ăn',
        example: 'Cơm gà',
    })
    name: string;

    @ApiProperty({
        description: 'Đường dẫn ảnh món ăn',
        example: 'https://example.com/com-ga.jpg',
    })
    avatar: string;

    @ApiProperty({
        description: 'Số calories trong món ăn',
        example: 250.5,
    })
    calories: number;

    @ApiProperty({
        description: 'Lượng protein (g)',
        example: 15.5,
    })
    protein: number;

    @ApiProperty({
        description: 'Lượng carbs (g)',
        example: 30.5,
    })
    carbs: number;

    @ApiProperty({
        description: 'Lượng chất béo (g)',
        example: 8.5,
    })
    fat: number;

    @ApiProperty({
        description: 'Loại thức ăn',
        enum: TYPE_FOOD,
        example: TYPE_FOOD.ADMIN_FOOD,
    })
    food_type: TYPE_FOOD;

    @ApiProperty({
        description: 'Trạng thái món ăn',
        enum: STATUS,
        example: STATUS.ACTIVE,
    })
    status: STATUS;

    @ApiProperty({
        description: 'Thông tin người tạo',
        type: () => UserResponse,
        required: false,
    })
    created_by?: UserResponse;

    @ApiProperty({
        description: 'ID người tạo món ăn',
        example: 1,
        required: false,
    })
    create_by_id?: number;

    @ApiProperty({
        description: 'Đơn vị khẩu phần',
        example: 'gram',
    })
    serving_unit: string;

    @ApiProperty({
        description: 'Kích thước khẩu phần',
        example: 100,
    })
    serving_size: number;

    @ApiProperty({
        description: 'Thời gian tạo',
        example: '2024-10-29T10:00:00Z',
    })
    created_at: Date;

    @ApiProperty({
        description: 'Thời gian cập nhật gần nhất',
        example: '2024-10-29T10:00:00Z',
    })
    updated_at: Date;
}

export class FoodListResponse {
    @ApiProperty({
        description: 'Danh sách món ăn',
        type: [FoodResponse],
        example: [FoodResponse]
    })
    data: FoodResponse[];

    @ApiProperty({
        description: 'Tổng số món ăn',
        example: 100,
    })
    total: number;

    @ApiProperty({
        description: 'Trang hiện tại',
        example: 1,
    })
    page: number;

    @ApiProperty({
        description: 'Số lượng món ăn trên mỗi trang',
        example: 10,
    })
    limit: number;
}