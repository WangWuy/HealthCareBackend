import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './utils/exceptions/all.exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();  // This loads your .env file

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('HealthCare Service')
    .setDescription('The HealthCare Service API description')
    .setVersion(process.env.CONFIG_BUILD_NUMBER)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Cấu hình CORS
  app.enableCors({
    origin: 'http://localhost:8081', // Cho phép truy cập từ origin này
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Nếu cần sử dụng cookie hoặc thông tin xác thực
  });

  await app.listen(3000);
}
bootstrap();
