import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export interface WorksModel extends Base { }

export class WorksModel extends TimeStamps {
  @prop()
  title: string

  @prop()
  slug: string

  @prop()
  description_full: string

  @prop()
  description_short: string

  @prop()
  poster: string

  @prop()
  image_1?: string

  @prop()
  image_2?: string

  @prop()
  image_3?: string

  @prop()
  image_4?: string

  @prop()
  image_5?: string

  @prop()
  image_6?: string
}