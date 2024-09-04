import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { FoodEntity } from './food.entity';
import { CommonEntity } from './_common.entity';

@Entity('food_logs')
export class FoodLogEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.food_logs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => FoodEntity)
  @JoinColumn({ name: 'food_id' })
  food: FoodEntity;

  @Column({ name: 'food_id' })
  food_id: number;

  @Column('float')
  amount: number; // in grams or servings

  @Column('float')
  calories: number;

  @Column('float')
  protein: number;

  @Column('float')
  carbs: number;

  @Column('float')
  fat: number;

  @CreateDateColumn({ name: 'logged_at' })
  logged_at: Date;

  @Column({ type: 'varchar', nullable: true })
  meal_type: string; // Thêm loại bữa ăn (ví dụ: breakfast, lunch, dinner, snack)
}