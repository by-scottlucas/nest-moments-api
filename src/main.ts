import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Defina como true em produção se estiver usando HTTPS
  }));

  app.enableCors({
    origin: 'http://localhost:8100', // URL do seu app Ionic
    credentials: true,
  });

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());

  const options = new DocumentBuilder()
    .setTitle("Nest Moments API")
    .setVersion("1.0.0")
    .setDescription("Projeto de uma API desenvolvida em NestJS utiizada como Back End do app Ionic Moments")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);

}

bootstrap();