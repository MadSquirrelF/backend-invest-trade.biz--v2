import { IsString } from "class-validator"

export class CreateBrandDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  slug: string

  @IsString()
  logo_image: string

}