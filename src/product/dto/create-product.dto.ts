import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator"

export class Settings {
  @IsString()
  name: string
  @IsString()
  value: string
}

export class CreateProductDto {
  @IsString()
  image: string

  @IsBoolean()
  is_available: boolean

  @IsString()
  title: string

  @IsString()
  slug: string

  @IsString()
  description_short: string

  @IsArray()
  details: Settings[]

  @IsString()
  description_full: string

  @IsArray()
  @IsString({ each: true })
  category: string[]

  @IsArray()
  @IsString({ each: true })
  add?: string[]

  @IsArray()
  @IsString({ each: true })
  brand: string[]

  isSendTelegram?: boolean
}