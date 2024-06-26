import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { configureApp } from './app.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  configureApp(app);
  const port = configService.get<number>('app.port');
  await app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
}
bootstrap();
