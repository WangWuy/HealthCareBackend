import { Column } from 'typeorm';

export enum BOOLEAN {
    FALSE = 0,
    TRUE = 1,
}

export enum GENDER {
    FEMALE = 0,
    MALE = 1,
}

export enum STATUS {
    UNACTIVE = 0,
    ACTIVE = 1,
}

export enum TYPE_FOOD {
    ADMIN_FOOD = 0,
    USER_FOOD = 1,
}

export abstract class CommonEntity {
    @Column('datetime', {
        default: () => 'current_timestamp()',
    })
    created_at: Date;

    @Column('datetime', {
        default: () => 'current_timestamp()',
        onUpdate: 'current_timestamp()',
    })
    updated_at: Date;
}