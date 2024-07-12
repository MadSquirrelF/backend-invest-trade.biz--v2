import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { InfoService } from "./info.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";
import { InfoDto } from "./dto/info.dto";

@Controller('info')
export class InfoController {
  constructor(private readonly InfoService: InfoService) { }


  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {
    return this.InfoService.create()
  }

  @Get()
  async getAll(
  @Query('_searchTerm') searchTerm?: string,
  @Query('_category') category?: string,
  ) {
    return this.InfoService.getAll(searchTerm, category)
  }

  @Get(':id')
  @Auth('ADMIN')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.InfoService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: InfoDto) {
    return this.InfoService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {

    return this.InfoService.delete(id)
  }


}