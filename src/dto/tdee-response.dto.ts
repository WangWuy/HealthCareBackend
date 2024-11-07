import { ApiProperty } from '@nestjs/swagger';

export class MealDistributionDto {
    @ApiProperty()
    breakfast: number;

    @ApiProperty()
    lunch: number;

    @ApiProperty()
    dinner: number;

    @ApiProperty()
    snacks: number;
}

export class NutritionRecommendationDto {
    @ApiProperty()
    total_calories: number;

    @ApiProperty()
    protein: number;

    @ApiProperty()
    carbs: number;

    @ApiProperty()
    fat: number;

    @ApiProperty()
    meal_distribution: MealDistributionDto;
}

export class TdeeResponseDto {
    @ApiProperty()
    tdee: number;

    @ApiProperty()
    recommendation: NutritionRecommendationDto;
}

export class TdeeHistoryDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    tdee: number;
  
    @ApiProperty()
    createdAt: Date;
}