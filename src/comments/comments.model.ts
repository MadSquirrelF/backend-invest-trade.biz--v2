import { Ref, prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ProductModel } from "src/product/product.model";
import { UserModel } from "src/user/user.model";

export interface CommentsModel extends Base {}

export class CommentsModel extends TimeStamps {

  @prop({ ref: () => UserModel })
  user: Ref<UserModel>

  @prop({ ref: () => ProductModel })
  product:  Ref<ProductModel>

  @prop()
  comment: string

  @prop()
	reply: CommentsModel[]

	@prop({ default: 0 })
	likes: number
}