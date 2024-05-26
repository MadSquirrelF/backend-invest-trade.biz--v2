import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModule } from 'src/product/product.module';

import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';
import { UserModule } from 'src/user/user.module';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: OrderModel,
    schemaOptions: {
      collection: 'Order'
    }
  }]), TelegramModule, UserModule, ProductModule],
  
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule { }