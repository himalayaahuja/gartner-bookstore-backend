import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { SeedsModule } from './modules/seeds/seeds.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './', 'gartner-bookstore-frontend'),
      // exclude: ['/api*'],
    }),
    BooksModule,
    UsersModule,
    CommandModule,
    SeedsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('books');
  }
}
