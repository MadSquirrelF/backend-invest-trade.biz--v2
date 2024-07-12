import { InjectModel } from "nestjs-typegoose";
import { InfoModel } from "./info.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InfoDto } from "./dto/info.dto";
import { NotFoundException } from "@nestjs/common";

export class InfoService {
	constructor(
		@InjectModel(InfoModel) private readonly InfoModel: ModelType<InfoModel>
	) {}

  async getAll(searchTerm?: string, category?: string) {
		let base = this.InfoModel.find({});

    if (category) {
      base.where('category').equals(category);
    }

    if (searchTerm) {
      base.where('question').regex(new RegExp(searchTerm, 'i'));
    }

    const options = base.getQuery();

    const query = this.InfoModel.find(options);

		return query;
	}


  async create() {
		const defaultValue: InfoDto = {
			question: '',
			answer: '',
			category: '',
		}

		const Info = await this.InfoModel.create(defaultValue)
		return Info._id
	}

  async delete(id: string) {
		const Info = await this.InfoModel.findByIdAndDelete(id).exec()

		if (!Info) throw new NotFoundException('Вопрос не найден')

		return Info
	}

  async update(_id: string, dto: InfoDto) {
		const Info = await this.InfoModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()

		if (!Info) throw new NotFoundException('Вопрос не найден')

		return Info
	}

  async byId(_id: string) {
		const Info = await this.InfoModel.findById(_id)

		if (!Info) throw new NotFoundException('Вопрос не найден')

		return Info
	}

}