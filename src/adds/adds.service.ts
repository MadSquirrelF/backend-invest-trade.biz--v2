import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AddModel } from './add.model';
import { AddDto } from './dto/adds.dto';

@Injectable()
export class AddsService {
  constructor(@InjectModel(AddModel) private readonly AddModel: ModelType<AddModel>) { }
  async bySlug(slug: string) {
    const doc = await this.AddModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Add not found')
    return doc
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) options = { $or: [{ name: new RegExp(searchTerm, 'i') }] }
    return this.AddModel.find(options).select('-updatedAt -__v')
      .sort({ createdAt: 'desc' }).exec()
  }


  /* Admin place */

  async byId(_id: string) {
    const Add = await this.AddModel.findById(_id)
    if (!Add) throw new NotFoundException('Add not found')
    return Add
  }

  async update(_id: string, dto: AddDto) {
    const updateDoc = await this.AddModel.findByIdAndUpdate(_id, dto, { new: true }).exec()

    if (!updateDoc) throw new NotFoundException('Add not found')

    return updateDoc
  }

  async create() {
    const defaultValue: AddDto = {
      name: '',
      slug: '',
      price: 0,
      photo: '',

    }

    const Add = await this.AddModel.create(defaultValue)
    return Add._id
  }

  async getCollections() {
    const adds = await this.getAll()
    const collections = adds
    return collections
  }

  async delete(id: string) {
    const deleteDoc = await this.AddModel.findByIdAndDelete(id).exec()

    if (!deleteDoc) throw new NotFoundException('Add not found')

    return deleteDoc
  }
}
