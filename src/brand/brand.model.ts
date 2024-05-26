import { prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export interface BrandModel extends Base { }

export class BrandModel extends TimeStamps {
  @prop()
  name: string

  @prop({ unique: true })
  slug: string

  @prop()
  description: string

  @prop()
  logo_image: string
}