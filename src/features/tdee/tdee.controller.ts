import { Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { TdeeService } from './tdee.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { NutritionRecommendationDto, TdeeHistoryDto, TdeeResponseDto } from 'src/dto/tdee-response.dto';

@ApiTags('tdee')
@ApiBearerAuth()
@Controller('api/tdee')
@UseGuards(JwtAuthGuard)
export class TdeeController {
  constructor(private readonly tdeeService: TdeeService) { }

  @Get(':userId')
  @ApiOperation({ summary: 'Lấy TDEE và khuyến nghị dinh dưỡng của người dùng' })
  @ApiParam({ name: 'userId', description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'Trả về TDEE và khuyến nghị dinh dưỡng', type: TdeeResponseDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  async getUserTdeeAndRecommendation(@Param('userId') userId: number): Promise<TdeeResponseDto> {
    return this.tdeeService.getUserTdeeAndRecommendation(userId);
  }

  @Get('history/:userId')
  @ApiOperation({ summary: 'Lấy lịch sử TDEE của người dùng' })
  @ApiParam({ name: 'userId', description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'Trả về lịch sử TDEE', type: [TdeeHistoryDto] })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  async getTdeeHistory(@Param('userId') userId: number) {
    return this.tdeeService.getTdeeHistory(userId);
  }

  @Post('recalculate/:userId')
  @ApiOperation({ summary: 'Tính toán lại TDEE của người dùng' })
  @ApiParam({ name: 'userId', description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'TDEE đã được tính toán lại thành công', type: TdeeResponseDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  async recalculateTdee(@Param('userId') userId: number) {
    return this.tdeeService.recalculateAndSaveTdee(userId);
  }

  @Get('nutrition-recommendation/:userId')
  @ApiOperation({ summary: 'Lấy khuyến nghị dinh dưỡng cho người dùng' })
  @ApiParam({ name: 'userId', description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'Trả về khuyến nghị dinh dưỡng', type: NutritionRecommendationDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  async getNutritionRecommendation(@Param('userId') userId: number) {
    return this.tdeeService.calculateNutritionRecommendation(userId);
  }
}