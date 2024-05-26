import { IsNumber, IsObject, IsString, isArray } from 'class-validator'
import { UpdateUserDto } from 'src/user/dto/user-update.dto'

export class NewBlock {
	@IsString()
	type: string

	@IsString()
	blockTitle?: string

	paragraphs?: string[]

	@IsString()
	image?: string
}

export class NewsDto {
	@IsString()
	title: string

	@IsString()
	slug: string;

	@IsString()
	subtitle: string

	blocks: NewBlock[]

	@IsString()
	preview_img: string;

	views?: number

	isSendTelegram?: boolean
}
