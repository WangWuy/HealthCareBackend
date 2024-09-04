import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity, STATUS, TYPE_FOOD } from './_common.entity';
import { UserEntity } from './user.entity';

@Entity('foods')
export class FoodEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        default: '',
    })
    name: string;

    @Column()
    avatar: string;

    @Column('float', {
        default: '0',
    })
    calories: number;

    @Column('float', {
        default: '0',
    })
    protein: number;

    @Column('float', {
        default: '0',
    })
    carbs: number;

    @Column('float', {
        default: '0',
    })
    fat: number;

    @Column('int', {
        default: '0',
    })
    food_type: TYPE_FOOD.ADMIN_FOOD;

    @Column({ default: true })
    status: STATUS.ACTIVE;
    
    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: 'create_by_id' })
    created_by: UserEntity; // Thêm trường để biết ai tạo food (null nếu là admin food)

    @Column({ name: 'create_by_id', nullable: true })
    create_by_id: number;

    @Column('varchar', { default: 'gram' })
    serving_unit: string; // Thêm đơn vị khẩu phần (ví dụ: gram, ml, piece)

    @Column('float', { default: 100 })
    serving_size: number; // Thêm kích thước khẩu phần mặc định
}