import { prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export interface AddModel extends Base { }

export class AddModel extends TimeStamps {

  @prop()
  name: string

  @prop({ unique: true })
  slug: string

  @prop()
  price: number

  @prop()
  photo: string

}