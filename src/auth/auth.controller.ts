import { Controller, Post, Body, UseGuards, Get, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

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