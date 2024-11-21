import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
