import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(PORT);
};

bootstrap();