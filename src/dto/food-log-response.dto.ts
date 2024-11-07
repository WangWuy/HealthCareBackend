import { ApiProperty } from '@nestjs/swagger';

export class LogFoodDto {
    @ApiProperty()
    food_id: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    meal_type: string;
}

export class FoodLogResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    food_id: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    meal_type: string;

    @ApiProperty()
    calories: number;

    @ApiProperty()
    protein: number;

    @ApiProperty()
    carbs: number;

    @ApiProperty()
    fat: number;
}

export class DailyNutritionResponseDto {
    @ApiProperty()
    calories: number;

    @ApiProperty()
    protein: number;

    @ApiProperty()
    carbs: number;

    @ApiProperty()
    fat: number;

    @ApiProperty()
    goal: any; // Replace 'any' with the actual type of the goal

    @ApiProperty()
    tdee: number;
}