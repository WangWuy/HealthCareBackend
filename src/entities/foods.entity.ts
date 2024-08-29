import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonEntity, STATUS, TYPE_FOOD } from './_common.entity';

@Entity('foods')
export class FoodsEntity extends CommonEntity {
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
}