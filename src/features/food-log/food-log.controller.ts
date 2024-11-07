import { Controller, Post, Get, Body, Query, UseGuards, Param, Delete, BadRequestException } from '@nestjs/common';
import { FoodLogService } from './food-log.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiResponse, ApiOperation, ApiTags, ApiBearerAuth, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DailyNutritionResponseDto, FoodLogResponseDto, LogFoodDto } from 'src/dto/food-log-response.dto';

@ApiTags('food-log')
@ApiBearerAuth()
@Controller('api/food-logs')
@UseGuards(JwtAuthGuard)
export class FoodLogController {
    constructor(private readonly foodLogService: FoodLogService) { }

    @Post(':userId')
    @ApiOperation({ summary: 'Ghi nhận một mục ăn uống cho người dùng' })
    @ApiParam({ name: 'userId', description: 'ID của người dùng' })
    @ApiBody({ type: LogFoodDto })
    @ApiResponse({ status: 201, description: 'Mục ăn uống được tạo thành công', type: FoodLogResponseDto })
    @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng hoặc thực phẩm' })
    logFood(
        @Param('userId') userId: number,
        @Body() logData: LogFoodDto
    ) {
        return this.foodLogService.logFood(userId, logData.food_id, logData.amount, logData.meal_type);
    }

    @Get('daily/:userId')
    @ApiOperation({ summary: 'Lấy nhật ký ăn uống hàng ngày của người dùng' })
    @ApiParam({ name: 'userId', description: 'ID của người dùng' })
    @ApiQuery({ name: 'date', required: true, description: 'Ngày của nhật ký ăn uống (YYYY-MM-DD)' })
    @ApiQuery({ name: 'meal_type', required: false, description: 'Loại bữa ăn' })
    @ApiResponse({ status: 200, description: 'Nhật ký ăn uống hàng ngày được lấy thành công', type: [FoodLogResponseDto] })
    @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
    async getDailyFoodLog(
        @Param('userId') userId: number,
        @Query('date') date: string,
        @Query('meal_type') mealType?: string
    ) {
        if (!date) {
            throw new BadRequestException('Ngày là bắt buộc');
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new BadRequestException('Định dạng ngày không hợp lệ');
        }

        return this.foodLogService.getDailyFoodLog(userId, parsedDate, mealType);
    }

    @Get('nutrition/:userId')
    @ApiOperation({ summary: 'Lấy tổng kết dinh dưỡng hàng ngày cho người dùng' })
    @ApiParam({ name: 'userId', description: 'ID của người dùng' })
    @ApiQuery({ name: 'date', required: true, description: 'Ngày cho tổng kết dinh dưỡng (YYYY-MM-DD)' })
    @ApiResponse({ status: 200, description: 'Tổng kết dinh dưỡng hàng ngày được lấy thành công', type: DailyNutritionResponseDto })
    @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ' })
    getDailyNutrition(
        @Param('userId') userId: number,
        @Query('date') date: string
    ) {
        return this.foodLogService.getDailyNutrition(userId, new Date(date));
    }

    @Delete(':userId/:logId')
    @ApiOperation({ summary: 'Xóa một mục nhật ký ăn uống' })
    @ApiParam({ name: 'userId', description: 'ID của người dùng' })
    @ApiParam({ name: 'logId', description: 'ID của mục nhật ký ăn uống cần xóa' })
    @ApiResponse({ status: 200, description: 'Mục nhật ký ăn uống được xóa thành công' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy mục nhật ký ăn uống' })
    deleteFoodLog(
        @Param('userId') userId: number,
        @Param('logId') logId: number
    ) {
        return this.foodLogService.deleteFoodLog(userId, logId);
    }
}