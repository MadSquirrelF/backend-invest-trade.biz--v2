import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[], folder: string = 'default', email?: string): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`
    email ? uploadFolder + `/${email}` : uploadFolder
    await ensureDir(uploadFolder)
    var urlImage

    const res: FileResponse[] = await Promise.all(
      files.map(async file => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
        email ? urlImage = `/uploads/${folder}/${email}/${file.originalname}` : urlImage = `/uploads/${folder}/${file.originalname}`
        return {
          url: urlImage,
          name: file.originalname,
        }
      })
    )
    return res
  }

}
