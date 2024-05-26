
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { WorksDto } from './dto/works.dto';
import { WorksService } from './works.service';
@Controller('works')
export class WorksController {
  constructor(private readonly WorkService: WorksService) { }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.WorkService.bySlug(slug)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.WorkService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('ADMIN')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.WorkService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {
    return this.WorkService.create()
  }



  @Put('update-liked')
  @HttpCode(200)
  async updateCountOpened(@Body('slug') slug: string) {
    return this.WorkService.updateLike(slug)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: WorksDto) {
    return this.WorkService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {

    return this.WorkService.delete(id)
  }
}
