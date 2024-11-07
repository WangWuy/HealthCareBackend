import { Controller, Post, Body, UseGuards, Get, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log('Processing registration request');
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Đăng nhập với email và mật khẩu' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log('Processing login request');
    return this.authService.localLogin(loginDto);
  }
  
  @ApiOperation({ summary: 'Đăng nhập với Google' })
  @Post('google')
  async googleAuth(@Body('token') token: string) {
    this.logger.log('Received Google auth request');
    const result = await this.authService.googleLogin(token);
    this.logger.log('Google auth completed');
    return result;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthRedirect(@Req() req) {
    return this.authService.login(req.user);
  }
}