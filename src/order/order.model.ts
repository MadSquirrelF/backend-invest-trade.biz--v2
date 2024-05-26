import { Ref, prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { ProductModel } from "src/product/product.model"
import { UserModel } from "src/user/user.model"

export interface OrderModel extends Base { }


export class Items {
  @prop()
  id: string

  @prop()
  name: string

  @prop()
  image: string

  @prop()
  category: string

  @prop()
  brand: string

  @prop()
  count: number

  @prop()
  url: string
}

export class Address {
  @prop()
  country: string

  @prop()
  city: string

  @prop()
  street: string
}

export class OrderModel extends TimeStamps {
  @prop()
  slug: string

  @prop({ default: "Ожидание" })
  status: string

  @prop()
  total_count: number

  @prop()
  address: Address

  @prop({ default: "По карте" })
  payment: string;

  @prop({ ref: () => UserModel })
  user: Ref<UserModel>

  @prop()
  items: Items[]

  @prop({ default: false })
  isSendTelegram?: boolean
}