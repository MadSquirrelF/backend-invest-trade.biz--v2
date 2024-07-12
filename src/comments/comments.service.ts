import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { CommentsModel } from "./comments.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { ProductService } from "src/product/product.service";
import { SetCommentDto } from "./dto/set-comment.dto";
import { Types } from "mongoose";
import { UserModel } from "src/user/user.model";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentsModel)
    private readonly commentsModel: ModelType<CommentsModel>,
    private readonly productService: ProductService
  ) { }

  async getProductComments(slug: string) {

    const product = this.productService.bySlug(slug)

    const comments = await this.commentsModel.find({ product: { $in: (await product)._id } }).populate('user').exec()

    if (!comments) throw new NotFoundException('Comments not found')
      
    return comments
  }

  async updateLike(commentId: string) {
    const updateDoc = await this.commentsModel.findByIdAndUpdate(commentId, { $inc: { likes: 1 } }, { new: true }).exec()

    if (!updateDoc) throw new NotFoundException('Comment not found')

    return updateDoc
  }

  async createComment(user: UserModel, dto: SetCommentDto) {

    const { productId, comment } = dto;

    const newComment = {
      user: this.returnUserFields(user),
      product: productId,
      comment: comment,
      reply: [],
      like: 0
    }

    const value = await this.commentsModel.create(newComment)

    await value.save()
  }

  async createReply(user: UserModel, dto: SetCommentDto, commentId: string) {

    const { productId, comment } = dto;

    const newComment = {
      user: this.returnUserFields(user),
      product: productId,
      comment: comment,
      reply: [],
      like: 0
    }

    const value = await this.commentsModel.findByIdAndUpdate(commentId,{
      $push: {
        reply: newComment
      }
    }, { new: true }).exec()
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      avatar: user.avatar,
      username: user.username,
    }
  }

}