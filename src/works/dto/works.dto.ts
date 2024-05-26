import { IsString } from "class-validator"

export class WorksDto {
  @IsString()
  title: string

  @IsString()
  slug: string

  @IsString()
  description_full: string

  @IsString()
  description_short: string

  @IsString()
  image_1?: string

  @IsString()
  image_2?: string

  @IsString()
  image_3?: string

  @IsString()
  image_4?: string

  @IsString()
  image_5?: string

  @IsString()
  image_6?: string

  @IsString()
  poster: string
}