import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonEntity } from './_common.entity';

@Entity('user_goals')
export class UserGoalsEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goal_type: number; // Loại mục tiêu (ví dụ: giảm cân, tăng cân, duy trì cân nặng)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date; // Ngày bắt đầu của mục tiêu

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date; // Ngày kết thúc của mục tiêu (nếu có)

  @Column({ type: 'float' })
  target_weight: number; // Cân nặng mục tiêu

  @Column()
  rate: number; // Tốc độ tăng/giảm cân mong muốn (ví dụ: chậm, vừa, nhanh)

  @Column()
  activity_level: number; // Mức độ tập luyện (ví dụ: từ 1 đến 5)
}