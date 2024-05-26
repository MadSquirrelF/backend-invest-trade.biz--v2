import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from 'src/user/user.model'

export interface NewsModel extends Base {}

export class NewBlock {
	@prop()
	type: string

	@prop()
	blockTitle?: string

	@prop()
	paragraphs?: string[]

	@prop()
	image?: string
}

export class NewsModel extends TimeStamps {
	@prop()
	title: string

	@prop()
	slug: string;

	@prop()
	subtitle: string

	@prop()
	blocks: NewBlock[]

	@prop()
	preview_img: string;

	@prop({ default: 0 })
	views?: number

	@prop({ default: false })
	isSendTelegram?: boolean
}
