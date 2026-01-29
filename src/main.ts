import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// สำหรับ Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// เพิ่มการใช้งาน cookie-parser
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // ใช้ cookie-parser middleware

  // Global prefix สำหรับยังไม่ได้ขึ้น server
  // app.setGlobalPrefix('api');

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    // .addBearerAuth() // เปิดถ้าใช้ JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL = /api
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
