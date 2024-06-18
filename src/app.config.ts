import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

export function configureApp(app: INestApplication) {
  const configService = app.get(ConfigService);
  const allowedOrigins = configService.get<string[]>('app.allowedOrigins');

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('Origin not allowed'), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Accept',
      'access-token',
      'X-access-token',
    ],
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
}
