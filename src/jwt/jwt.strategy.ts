import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: configService.get('JWT_SECRET'),
            secretOrKey: '8343b632fb7b69c13e9fecd5fc8450903a7cce3fcc035941237c9a3da9eb4ff48a40edef91c7eb6d9e41c029269ce36513aa635234b5f3d8079680ae3b038e4d',
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}