import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModule } from 'src/product/product.module';
import { CategoryController } from './category.controller';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: CategoryModel,
    schemaOptions: {
      collection: 'Category'
    }
  }]), ProductModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
