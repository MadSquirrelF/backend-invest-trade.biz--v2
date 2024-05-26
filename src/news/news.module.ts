import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsModel } from './news.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { TelegramModule } from 'src/telegram/telegram.module';
import { UserModel } from 'src/user/user.model';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: NewsModel,
    schemaOptions: {
      collection: 'News'
    }
  }]), TelegramModule, UserModel],
  providers: [NewsService],
  controllers: [NewsController],
  exports: [NewsService]
})
export class NewsModule { }
