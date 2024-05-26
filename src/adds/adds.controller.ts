import { AddsService } from './adds.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { AddDto } from './dto/adds.dto';


@Controller('adds')
export class AddsController {
  constructor(private readonly AddService: AddsService) { }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.AddService.bySlug(slug)
  }

  @Get('/collections')
  async getCollections() {
    return this.AddService.getCollections()
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.AddService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('ADMIN')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.AddService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {

    return this.AddService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: AddDto) {
    return this.AddService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {

    return this.AddService.delete(id)
  }
}
