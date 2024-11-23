import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const logger = new Logger();

  await app
    .listen(process.env.PORT)
    .then(() =>
      logger.log(`Application listening on port: ${process.env.PORT}`),
    )
    .catch((err) => {
      logger.error(err);
    });
}
bootstrap();
