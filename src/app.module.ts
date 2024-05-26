import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AddsModule } from './adds/adds.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { getMongoDbConfig } from './config/mongodb.config';
import { FileModule } from './file/file.module';
import { NewsModule } from './news/news.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';
import { WorksModule } from './works/works.module';
import { BrandService } from './brand/brand.service';
import { BrandModule } from './brand/brand.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig
    }),
    UserModule,
    ProductModule,
    NewsModule,
    CategoryModule,
    TelegramModule,
    AddsModule,
    FileModule,
    AuthModule,
    WorksModule,
    RatingModule,
    BrandModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
