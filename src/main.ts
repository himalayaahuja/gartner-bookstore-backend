import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod } from '@nestjs/common';
import { ApiExceptionFilter } from './exceptions/api-exception.filter';
import { ApiValidationPipe } from './pipes/api-validation.pipe';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalPipes(new ApiValidationPipe());
  app.enableCors();

  const configService = app.get(ConfigService);
  const node_env = configService.get('NODE_ENV');

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  node_env === 'development' ? app.useStaticAssets(resolve('./src/public')) : app.useStaticAssets(resolve('./public'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
