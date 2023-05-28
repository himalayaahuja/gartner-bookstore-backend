import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod } from '@nestjs/common';
import { ApiExceptionFilter } from './exceptions/api-exception.filter';
import { ApiValidationPipe } from './pipes/api-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new ApiExceptionFilter());
  // app.useGlobalPipes(new ApiValidationPipe());

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  await app.listen(3000);
}
bootstrap();
