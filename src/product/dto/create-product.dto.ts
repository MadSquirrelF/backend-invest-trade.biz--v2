import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator"

export class Adds {
	@IsString()
	title: string;

	@IsString()
  description: string;

	@IsNumber()
  price: number;

	@IsString()
  poster: string;
}

export class Settings {
	@IsString()
	name: string
	@IsString()
	value: string
}

export class CreateProductDto {
	@IsString()
	slug: string

	@IsString()
	poster: string

	@IsString()
	title: string

	@IsBoolean()
	is_available: boolean

	@IsString()
	brand: string

	@IsString()
	description: string

	@IsNumber()
	rating: number

  @IsNumber()
  price: number;

	@IsNumber()
	view_count: number

	@IsArray()
	details: Settings[]
  
	@IsString()
	category: string;

  @IsArray()
	add: Adds[]

	isSendTelegram?: boolean
}