import { Module } from '@nestjs/common';
import { AddsService } from './adds.service';
import { AddsController } from './adds.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { AddModel } from './add.model';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: AddModel,
    schemaOptions: {
      collection: 'Add'
    }
  }])],
  providers: [AddsService],
  controllers: [AddsController]
})
export class AddsModule { }
