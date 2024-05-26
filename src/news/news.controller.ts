import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { User } from 'src/user/decorators/user.decorator';
import { UserModel } from 'src/user/user.model';
import { NewsDto } from './dto/news.dto';
import { NewsService } from './news.service';
import { SortOrder } from 'mongoose';

@Controller('news')
export class NewsController {
  constructor(private readonly NewService: NewsService) { }

  @Get()
  async getAll(
  @Query('_searchTerm') searchTerm?: string,
  @Query('_limit') limit?: string,
  @Query('_page') page?: string,
  @Query('_sort') sort?: string,
  @Query('_order') order?: SortOrder | { $meta: "textScore"; },
  ) {
    return this.NewService.getAll(searchTerm, limit, page, sort, order)
  }

  @Get('details/:id')
  async getDetailsById(@Param('id', IdValidationPipe) id: string) {
    return this.NewService.byId(id);
  }

  @Get(':id')
  @Auth('ADMIN')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.NewService.byId(id)
  }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.NewService.bySlug(slug)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {
    return this.NewService.create()
  }

  @Put('update-count-opened')
  @HttpCode(200)
  async updateCountOpened(@Body('slug') slug: string) {
    return this.NewService.updateCountOpened(slug)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: NewsDto) {
    return this.NewService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {

    return this.NewService.delete(id)
  }

}
