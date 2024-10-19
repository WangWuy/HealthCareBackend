import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('water_intakes')
export class WaterIntakeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.waterIntakes)
  user: UserEntity;

  @Column('float')
  amount: number; // Lượng nước uống (đơn vị: ml)

  @CreateDateColumn()
  logged_at: Date;
}