import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { UserEntity } from '../../entities/user.entity';
import { UserResponseSwagger } from '../../response/user.response';
import { GetUserIdFromToken } from 'src/utils/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('USER V1')
@Controller('api/users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Danh sách người dùng' })
  @ApiOkResponse({
    type: UserResponseSwagger,
  })
  @Get('')
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Thông tin người dùng' })
  @ApiOkResponse({
    type: UserResponseSwagger,
  })
  @Get('detail')
  async userDetail(@GetUserIdFromToken() userId: number) {
    return this.userService.findOne(userId);
  }

  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @Post()
  async create(@Body() createUserDto: Partial<UserEntity>): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Cập nhật người dùng' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<UserEntity>): Promise<UserEntity> {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Xóa người dùng' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}