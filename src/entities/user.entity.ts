import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CommonEntity, STATUS } from './_common.entity';

@Entity('users')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('varchar')
  google_id: string;

  @Column('varchar', {
    default: '',
  })
  first_name: string;

  @Column('varchar', {
    default: '',
  })
  last_name: string;

  @Column('varchar', {
    default: '',
  })
  avatar: string;

  @Column({ default: true })
  status: STATUS.ACTIVE;
}
