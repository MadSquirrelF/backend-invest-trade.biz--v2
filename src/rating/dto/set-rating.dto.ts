import { IsNumber, IsString } from 'class-validator'

export class SetRatingDto {
  @IsString()
  productId: string

  @IsNumber()
  value: number
}