import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

import { BeatsheetsModule } from './beatsheets.module';

async function bootstrap() {
  const app = await NestFactory.create(BeatsheetsModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Beatsheets')
      .setDescription('The beatsheets API')
      .setVersion('1.0')
      .addTag('beatsheets')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(configService.get('PORT'));
}
bootstrap();
