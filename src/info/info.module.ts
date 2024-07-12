import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { InfoModel } from "./info.model";
import { InfoService } from "./info.service";
import { InfoController } from "./info.controller";

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: InfoModel,
    schemaOptions: {
      collection: 'Info'
    }
  }])],
  providers: [InfoService],
  controllers: [InfoController],
  exports: [InfoService]
})
export class InfoModule { }