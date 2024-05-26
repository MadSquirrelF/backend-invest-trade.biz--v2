import { IsNumber, IsString } from "class-validator";

export class AddDto {
  @IsString()
  name: string

  @IsString()
  slug: string

  @IsNumber()
  price: number

  @IsString()
  photo: string
}