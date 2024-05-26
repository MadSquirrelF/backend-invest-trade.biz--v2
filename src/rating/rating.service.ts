import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { ProductService } from 'src/product/product.service';
import { SetRatingDto } from './dto/set-rating.dto';
import { RatingModel } from './rating.model';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RatingModel)
    private readonly ratingModel: ModelType<RatingModel>,
    private readonly productService: ProductService
  ) { }

  async averageRatingbyProduct(productId: string) {
    const ratingsProduct: RatingModel[] = await this.ratingModel
      .aggregate()
      .match({ productId: new Types.ObjectId(productId) })
      .exec()

    return (
      ratingsProduct.reduce((acc, item) => acc + item.value, 0) /
      ratingsProduct.length
    )
  }

  async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
    const { productId, value } = dto

    const newRating = await this.ratingModel
      .findOneAndUpdate(
        { productId, userId },
        {
          userId,
          productId,
          value,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
      .exec()

    const averageRating = await this.averageRatingbyProduct(productId)

    await this.productService.updateRating(productId, averageRating)

    return newRating
  }

  async getProductValueByUser(productId: Types.ObjectId, userId: Types.ObjectId) {
    return this.ratingModel
      .findOne({ productId, userId })
      .select('value')
      .exec()
      .then((data) => (data ? data.value : 0))
  }



}
