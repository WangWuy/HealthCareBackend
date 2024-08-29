import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async create(createUserDto: Partial<UserEntity>): Promise<UserEntity> {
    this.logger.log(`Creating new user with email: ${createUserDto.email}`);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<UserEntity>): Promise<UserEntity> {
    this.logger.log(`Updating user with id: ${id}`);
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async findOrCreateUser(userDetails: Partial<UserEntity>): Promise<UserEntity> {
    let user = await this.findByEmail(userDetails.email);
    if (!user) {
      this.logger.log(`User not found, creating new user for email: ${userDetails.email}`);
      user = await this.create(userDetails);
    } else {
      this.logger.log(`Updating existing user: ${user.id}`);
      user = await this.update(user.id, userDetails);
    }
    return user;
  }
}