import { Controller, HttpCode, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string, @Query('email') email?: string) {
    return this.fileService.saveFiles([file], folder, email)
  }
}
