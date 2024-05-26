import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModule } from 'src/product/product.module';

import { BrandController } from './brand.controller';
import { BrandModel } from './brand.model';
import { BrandService } from './brand.service';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: BrandModel,
    schemaOptions: {
      collection: 'Brand'
    }
  }]), ProductModule],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule { }
