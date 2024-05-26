import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { WorksDto } from './dto/works.dto';
import { WorksModel } from './works.model';

@Injectable()
export class WorksService {

  telegramService: any;
  constructor(@InjectModel(WorksModel) private readonly WorksModel: ModelType<WorksModel>) { }

  async bySlug(slug: string) {
    const doc = await this.WorksModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Work not found')
    return doc
  }

  async updateLike(slug: string) {
    const updateDoc = await this.WorksModel.findOneAndUpdate({ slug }, { $inc: { countLiked: 1 } }, { new: true }).exec()

    if (!updateDoc) throw new NotFoundException('Work not found')

    return updateDoc
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) options = { $or: [{ title: new RegExp(searchTerm, 'i') }] }
    return this.WorksModel.find(options).select(' -__v')
      .sort({ createdAt: 'desc' }).exec()
  }

  /* Admin place */

  async byId(_id: string) {
    const Work = await this.WorksModel.findById(_id)
    if (!Work) throw new NotFoundException('Work not found')
    return Work
  }

  async update(_id: string, dto: WorksDto) {
    const updateDoc = await this.WorksModel.findByIdAndUpdate(_id, dto, { new: true }).exec()

    if (!updateDoc) throw new NotFoundException('Work not found')

    return updateDoc
  }

  async create() {
    const defaultValue: WorksDto = {
      title: '',
      slug: '',
      poster: '',
      description_short: '',
      description_full: '',
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: '',
      image_5: '',
      image_6: '',
    }

    const Add = await this.WorksModel.create(defaultValue)
    return Add._id
  }

  async delete(id: string) {
    const deleteDoc = await this.WorksModel.findByIdAndDelete(id).exec()

    if (!deleteDoc) throw new NotFoundException('Work not found')

    return deleteDoc
  }
}
