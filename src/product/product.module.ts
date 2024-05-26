import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { TelegramModule } from 'src/telegram/telegram.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: ProductModel,
    schemaOptions: {
      collection: 'Product'
    }
  }]), TelegramModule, UserModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule { }
