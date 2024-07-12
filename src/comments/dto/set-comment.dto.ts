import { IsNumber, IsString } from "class-validator"

export class SetCommentDto {
  @IsString()
  productId: string

  @IsString()
  comment: string
}