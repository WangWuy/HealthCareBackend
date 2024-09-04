import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../features/user/user.service';
import { OAuth2Client } from 'google-auth-library';
import { log } from 'console';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async validateUser(userDetails: any): Promise<any> {
    const { email, first_name, last_name, avatar } = userDetails;
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({
        email,
        first_name,
        last_name,
        avatar,
      });
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleToken(token: string) {
    this.logger.log('Validating Google token');
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      this.logger.log('Google token validated successfully');
      return payload;
    } catch (error) {
      this.logger.error('Invalid Google token', error.stack);
      throw new Error('Invalid Google token');
    }
  }

  async googleLogin(token: string) {
    this.logger.log('Processing Google login');
    const googleUser = await this.validateGoogleToken(token);
    this.logger.log(`Finding or creating user for email: ${googleUser.email}`);
    const user = await this.userService.findOrCreateUser({
      email: googleUser.email,
      google_id: googleUser.sub,
      first_name: googleUser.given_name,
      last_name: googleUser.family_name,
      avatar: googleUser.picture
    });
    this.logger.log(`User processed: ${user.id}`);
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user,
    };
  }
}