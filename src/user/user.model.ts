import { prop, Ref } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { OrderModel } from "src/order/order.model"
import { ProductModel } from "src/product/product.model"

export interface UserModel extends Base { }


export class FeatureFlags {

  @prop({ default: true })
  isProductRatingEnabled: boolean;

  @prop({ default: true })
  isCounterEnabled: boolean;
}

export class JsonSettings {

  @prop({ default: 'app_dark_theme' })
  theme?: string;

  @prop({ default: true })
  isFirstVisit?: boolean;

  @prop({ default: false })
  isProductPageWasOpened?: boolean;
}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string

  @prop()
  username: string

  @prop()
  description: string;

  @prop({ default: '' })
  firstname: string

  @prop({ default: '' })
  lastname: string

  @prop({ default: 'RUSSIA' })
  country: string

  @prop({ default: '' })
  city: string

  @prop({ default: '' })
  address: string

  @prop({ default: 18 })
  age: number

  @prop({ default: "RUB" })
  currency: string

  @prop({ default: "Мужской" })
  sex: string

  @prop({ default: "/uploads/users/default.svg" })
  avatar: string

  @prop({ default: "" })
  phone_number: string

  @prop()
  password: string

  @prop({ default: ['USER']})
  roles: string[]

  @prop({ default: {
    theme : 'app_light_theme',
    isFirstVisit: true,
    isProductPageWasOpened: false,
  }})
  jsonSettings?: JsonSettings

  @prop({ default: {
    isProductRatingEnabled : true,
    isCounterEnabled: true
  }})
  features?: FeatureFlags

  @prop({ default: [], ref: () => ProductModel })
  favorites?: Ref<ProductModel>[]
}