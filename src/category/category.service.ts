import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ProductService } from 'src/product/product.service';
import { ICollection } from './category.interface';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(CategoryModel) private readonly CategoryModel: ModelType<CategoryModel>,
    private readonly productService: ProductService) { }


  async bySlug(slug: string) {
    const doc = await this.CategoryModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Category not found')
    return doc
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) options = { $or: [{ name: new RegExp(searchTerm, 'i') }] }
    return this.CategoryModel.find(options).select('-updatedAt -__v').sort({ createdAt: 'desc' }).exec()
  }


  /* Admin place */

  async byId(_id: string) {
    const category = await this.CategoryModel.findById(_id)
    if (!category) throw new NotFoundException('Category not found')
    return category
  }

  async update(_id: string, dto: CreateCategoryDto) {
    const updateDoc = await this.CategoryModel.findByIdAndUpdate(_id, dto, { new: true }).exec()

    if (!updateDoc) throw new NotFoundException('Category not found')

    return updateDoc
  }

  async create() {
    const defaultValue: CreateCategoryDto = {
      name: '',
      slug: '',
      description: '',
      image: ''
    }

    const category = await this.CategoryModel.create(defaultValue)
    return category._id
  }

  async getCollections() {
    const categories = await this.getAll()
    const collections = await Promise.all(categories.map(async category => {
      // const productsByCategory = await this.productService.byCategory([category._id])

      const result: ICollection = {
        _id: String(category._id),
        slug: category.slug,
        title: category.name,
        description: category.description,
        image: category.image
      }
      return result
    }))
    return collections
  }

  async delete(id: string) {
    const deleteDoc = await this.CategoryModel.findByIdAndDelete(id).exec()

    if (!deleteDoc) throw new NotFoundException('Category not found')

    return deleteDoc
  }

}
