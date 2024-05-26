import { prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export interface CategoryModel extends Base { }

export class CategoryModel extends TimeStamps {
  @prop()
  name: string

  @prop({ unique: true })
  slug: string

  @prop()
  description: string

  @prop()
  image: string

}