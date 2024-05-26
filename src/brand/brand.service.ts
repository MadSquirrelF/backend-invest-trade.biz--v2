import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ProductService } from 'src/product/product.service';
import { BrandModel } from './brand.model';
import { CreateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(BrandModel) private readonly BrandModel: ModelType<BrandModel>,
    private readonly productService: ProductService) { }


  async bySlug(slug: string) {
    const doc = await this.BrandModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Brand not found')
    return doc
  }
  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) options = { $or: [{ name: new RegExp(searchTerm, 'i') }] }
    return this.BrandModel.find(options).select('-updatedAt -__v').sort({ createdAt: 'desc' }).exec()
  }

  /* Admin place */
  async byId(_id: string) {
    const category = await this.BrandModel.findById(_id)
    if (!category) throw new NotFoundException('Brand not found')
    return category
  }

  async update(_id: string, dto: CreateBrandDto) {
    const updateDoc = await this.BrandModel.findByIdAndUpdate(_id, dto, { new: true }).exec()

    if (!updateDoc) throw new NotFoundException('Brand not found')

    return updateDoc
  }

  async create() {
    const defaultValue: CreateBrandDto = {
      name: '',
      slug: '',
      description: '',
      logo_image: ''
    }

    const category = await this.BrandModel.create(defaultValue)
    return category._id
  }

  async delete(id: string) {
    const deleteDoc = await this.BrandModel.findByIdAndDelete(id).exec()

    if (!deleteDoc) throw new NotFoundException('Brand not found')

    return deleteDoc
  }
}
