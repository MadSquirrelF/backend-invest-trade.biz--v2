import { IsArray, IsNumber, IsString } from "class-validator"


export class Items {
 @IsString()
  id: string
 @IsString()
  name: string
 @IsString()
  image: string
 @IsString()
  category: string
 @IsString()
  brand: string
  @IsNumber()
  count: number
 @IsString()
  url: string
}

export class CreateOrderDto {
  @IsNumber()
  total_count: number

  @IsArray()
  items: Items[]
}