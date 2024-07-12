import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from 'src/user/user.model';

export interface ProductModel extends Base {}

export class Comments extends TimeStamps {
	@prop({ ref: () => UserModel })
  user: Ref<UserModel>

	@prop()
	comment: string;

	@prop()
	reply: Comments[]

	@prop({ default: 0 })
	likes: number
}

export class Adds {
	@prop()
	title: string;

	@prop()
  description: string;

	@prop()
  price: number;

	@prop()
  poster: string;
}

export class Settings {
	@prop()
	name: string
	@prop()
	value: string
}

export class ProductModel extends TimeStamps {
	@prop({ unique: true })
	slug: string

	@prop()
	poster: string

	@prop()
	title: string

	@prop({ default: true })
	is_available: boolean

	@prop()
	brand: string

	@prop()
	description: string

	@prop({ default: 4.0 })
	rating: number

	@prop({ default: 0 })
	view_count: number

	@prop()
	details: Settings[]

	@prop()
	comments: Comments[]

	@prop()
	category: string;

	@prop()
  price: number;

	@prop()
	add: Adds[]

	@prop({ default: false })
	isSendTelegram?: boolean
}
