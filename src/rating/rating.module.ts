import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { RatingModel } from './rating.model';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [RatingController],

  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
    ]),
    ProductModule,
  ],
  providers: [RatingService],
  exports: [RatingService]
})

export class RatingModule { }
