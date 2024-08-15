import { Injectable, NotFoundException, Options } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { TelegramService } from 'src/telegram/telegram.service'
import { NewsDto } from './dto/news.dto'
import { NewsModel } from './news.model'
import { SortOrder } from 'mongoose'
import { UserModel } from 'src/user/user.model'

@Injectable()
export class NewsService {
	constructor(
		@InjectModel(NewsModel) private readonly NewsModel: ModelType<NewsModel>,
		private readonly telegramService: TelegramService
	) {}

	async bySlug(slug: string) {
    const New = await this.NewsModel.findOne({ slug }).exec()
    if (!New) throw new NotFoundException('New not found')
    return New
  }

	async getAll(searchTerm?: string, limit?: string, page?: string, sort?: string, order?: SortOrder | { $meta: "textScore"; }, date?: string) {
		let options = {}

		if (searchTerm) options = { $or: [{ title: new RegExp(searchTerm, 'i') }] }

		   // Обработка параметра date
		if (date && date !== "all") {
        const startDate = new Date(`${date}-01-01T00:00:00Z`); // Начало года
        const endDate = new Date(`${date}-12-31T23:59:59Z`); // Конец года
        options = { ...options, createdAt: { $gte: startDate, $lte: endDate } };
    }

		const query = this.NewsModel.find(options);

		const pageOf = parseInt(page) || 1;
		const limitOf = parseInt(limit) || 6;

		if (sort && order) {
			if (sort === 'title'){
				query.sort({'title': order})
			}
			else if(sort === 'view') {
				query.sort({'views': order})
			}
			else {
				query.sort({ createdAt: order })
			}
		}

		// Получение данных с пагинацией
		const data = await query.skip((pageOf - 1) * limitOf).limit(limitOf).exec();

		// Подсчет общего количества документов для вычисления количества страниц
		const totalCount = await this.NewsModel.countDocuments(options).exec();
		const totalPages = Math.ceil(totalCount / limitOf);

		return {
			data,
			totalPages,
			currentPage: pageOf,
			totalCount
		};
	}

	async updateCountOpened(id: string) {
		const updateDoc = await this.NewsModel.findOneAndUpdate(
			{ id },
			{ $inc: { views: 1 } },
			{ new: true }
		).exec()

		if (!updateDoc) throw new NotFoundException('New not found')

		return updateDoc
	}

	/* Admin place */

	async byId(_id: string) {
		const New = await this.NewsModel.findById(_id)
		if (!New) throw new NotFoundException('New not found')
		return New
	}



	async update(_id: string, dto: NewsDto) {
		// if (!dto.isSendTelegram) {
		// 	await this.sendNotification(dto)
		// 	dto.isSendTelegram = true
		// }
		const updateDoc = await this.NewsModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()

		if (!updateDoc) throw new NotFoundException('New not found')

		return updateDoc
	}

	async create(user: UserModel) {
		const defaultValue = {
			title: '',
			slug: '',
			subtitle: '',
			preview_img: '/uploads/news/default.jpg',
			views: 0,
			blocks: [],
			likes: 0,
			category: '',
			author: this.returnUserFields(user),
		}

		const New = await this.NewsModel.create(defaultValue)
		return New._id
	}

	async delete(id: string) {
		const deleteDoc = await this.NewsModel.findByIdAndDelete(id).exec()

		if (!deleteDoc) throw new NotFoundException('New not found')

		return deleteDoc
	}

	async sendNotification(dto: NewsDto) {
		await this.telegramService.sendPhoto(
			`https://sun9-west.userapi.com/sun9-9/s/v1/ig2/0BFIJsSLdv_7Mu5qqqUspNipZmw999vtpeBBiVkP9YkK_sB2po2HX54zvg8o7AMBdGMNRlQFqv_yR8U2JQV9bJWI.jpg?size=2160x2160&quality=96&type=album`
		)

		const msg = `<b>🆕Новая новость уже ждет тебя на нашем сайте! 🗔 ${dto.title} 🗔</b>`

		await this.telegramService.sendMessage(msg, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://www.invest-trade.biz/#news',
							text: '👀 Смотреть новости!',
						},
					],
				],
			},
		})
	}

	returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      avatar: user.avatar,
      username: user.username,
    }
  }
}
