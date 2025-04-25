import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정 추가
  const config = new DocumentBuilder()
    .setTitle('[프로젝트 이름] API')
    .setDescription('[프로젝트 이름] API 문서')
    .setVersion('1.0')
    .addBearerAuth() // JWT 입력창 추가
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
