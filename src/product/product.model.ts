import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { AddModel } from 'src/adds/add.model'
import { BrandModel } from 'src/brand/brand.model'
import { CategoryModel } from 'src/category/category.model'

export interface ProductModel extends Base {}

export class Settings {
	@prop()
	name: string
	@prop()
	value: string
}

export class ProductModel extends TimeStamps {
	@prop()
	image: string

	@prop()
	title: string

	@prop()
	is_available: boolean

	@prop({ ref: () => BrandModel })
	brand: Ref<BrandModel>[]

	@prop()
	description_short: string

	@prop()
	description_full: string

	@prop({ default: 4.0 })
	rating?: number

	@prop({ default: 0 })
	countOpened?: number

	@prop({ unique: true })
	slug: string

	@prop()
	details: Settings[]

	@prop({ ref: () => CategoryModel })
	category: Ref<CategoryModel>[]

	@prop({ ref: () => AddModel })
	add?: Ref<AddModel>[]

	@prop({ default: false })
	isSendTelegram?: boolean
}
