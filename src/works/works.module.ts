import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { WorksModel } from './works.model';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: WorksModel,
    schemaOptions: {
      collection: 'Works'
    }
  }])],
  providers: [WorksService],
  controllers: [WorksController]
})
export class WorksModule { }
