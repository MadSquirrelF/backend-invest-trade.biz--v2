import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/category.dto';
@Controller('categories')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) { }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.CategoryService.bySlug(slug)
  }

  @Get('/collections')
  async getCollections() {
    return this.CategoryService.getCollections()
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.CategoryService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('ADMIN')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.CategoryService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {

    return this.CategoryService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateCategoryDto) {
    return this.CategoryService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {

    return this.CategoryService.delete(id)
  }
}
