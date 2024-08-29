import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { GoogleStrategy } from '../jwt/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // secret: configService.get<string>('JWT_SECRET'),
        secret: '8343b632fb7b69c13e9fecd5fc8450903a7cce3fcc035941237c9a3da9eb4ff48a40edef91c7eb6d9e41c029269ce36513aa635234b5f3d8079680ae3b038e4d',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy], 
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}