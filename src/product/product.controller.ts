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

  @Get('calculations')
  async getCalculationResult(@Body() dto: CreateProductDto) {
    return this.ProductService.getCalculation(dto);
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
  async getAll(
    @Query('_searchTerm') searchTerm?: string,
    @Query('_limit') limit?: string,
    @Query('_page') page?: string,
    @Query('_sort') sort?: string,
    @Query('_order') order?: SortOrder | { $meta: "textScore"; },
    @Query('_brand') brand?: string,
    @Query('_category') category?: string,
      ) {
    return this.ProductService.getProducts(searchTerm, limit, page, sort, order, brand, category)
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
