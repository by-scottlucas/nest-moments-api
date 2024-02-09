import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle("Nest Moments API")
    .setVersion("1.0.0")
    .setDescription("Projeto de uma API desenvolvida em NestJS para compôr o Back End do app Ionic Moments")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
