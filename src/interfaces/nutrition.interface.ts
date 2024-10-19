export interface NutritionRecommendation {
    total_calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal_distribution: MealDistribution;
}

export interface MealDistribution {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
}

export interface DailyNutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}