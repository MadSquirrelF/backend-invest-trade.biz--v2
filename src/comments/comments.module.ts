import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { CommentsModel } from "./comments.model";
import { TelegramModule } from "src/telegram/telegram.module";
import { UserModule } from "src/user/user.module";
import { ProductModule } from "src/product/product.module";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: CommentsModel,
    schemaOptions: {
      collection: 'Comments'
    }
  }]), TelegramModule, UserModule, ProductModule],
  
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule { }