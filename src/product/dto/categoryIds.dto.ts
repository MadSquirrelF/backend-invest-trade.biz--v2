import { IsNotEmpty, MinLength } from "class-validator";
import { Types } from 'mongoose'

export class CategoryIdsDto {
  @IsNotEmpty()
  @MinLength(24, { each: true })
  categoryIds: Types.ObjectId[]
}