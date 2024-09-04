import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './features/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './jwt/jwt.strategy';
import { FoodsModule } from './features/foods/foods.module';
import { UserGoalModule } from './features/goals/user-goals.module';
import { TdeeModule } from './features/tdee/tdee.module';
import { FoodLogModule } from './features/food-log/food-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin@123',
      database: 'healthcare',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT, 10) || 3306,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],

      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    FoodsModule,
    UserGoalModule,
    FoodLogModule,
    TdeeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy
  ],
})
export class AppModule { }
