import { prop, Ref } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { ProductModel } from "src/product/product.model"
import { UserModel } from "src/user/user.model"

export interface RatingModel extends Base { }

export class RatingModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  userId: Ref<UserModel>

  @prop({ ref: () => ProductModel })
  productId: Ref<ProductModel>

  @prop()
  value: number
}