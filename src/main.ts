import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const expressApp = require('express')(); // Importa express y crea una instancia
  const app = await NestFactory.create(AppModule,new ExpressAdapter(expressApp),);
  await app.listen(3000);
}
bootstrap();
