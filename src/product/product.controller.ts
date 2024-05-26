import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto';
import { SortOrder, Types } from 'mongoose';


@Controller('products')
export class ProductController {

  constructor(private readonly ProductService: ProductService) { }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.ProductService.bySlug(slug)
  }

  @Put('update-count-opened')
  @HttpCode(200)
  async updateCountOpened(@Body('slug') slug: string) {
    return this.ProductService.updateCountOpened(slug)
  }

  @Post('by-categories')
  @HttpCode(200)
  async byCategoryId(@Body('categoryIds') categoryIds: Types.ObjectId[]) {
    return this.ProductService.byCategory(categoryIds)
  }


  @Get('most-popular')
  async getMostPopular() {
    return this.ProductService.getMostPopular()
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string, @Query('page') page?: string, @Query('orderBy') orderBy?: SortOrder | { $meta: "textScore"; }, @Query('sortBy') sortBy?: string,@Query('brandIds') brandIds?: Types.ObjectId[],@Query('categoryIds') categoryIds?: Types.ObjectId[],  ) {
    return this.ProductService.getProducts( searchTerm, page, orderBy, sortBy, brandIds, categoryIds, )
  }


  @Get(':id')
  @Auth('ADMIN')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.ProductService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {
    return this.ProductService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
    return this.ProductService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {

    return this.ProductService.delete(id)
  }
}
