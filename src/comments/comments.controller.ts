import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { UserModel } from "src/user/user.model";
import { User } from "src/user/decorators/user.decorator";
import { SetCommentDto } from "./dto/set-comment.dto";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get(':id')
  async getAll(
    @Param('id', IdValidationPipe) productId: string,
  ) {
    return this.commentsService.getProductComments(productId)
  }

  

  @UsePipes(new ValidationPipe())
  @Put('update-like/:id')
  @HttpCode(200)
  @Auth("USER")
  async updateLike(@Param('id', IdValidationPipe) commentId: string,) {
    return this.commentsService.updateLike(commentId)
  }


  @Post('create/comment')
  @HttpCode(200)
  @Auth("USER")
  async createOrder(
    @User() user: UserModel,
    @Body()
    dto: SetCommentDto
  ) {
    return this.commentsService.createComment(user, dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('create/reply/:id')
  @HttpCode(200)
  @Auth("USER")
  async createReply(
    @Param('id', IdValidationPipe) commentId: string,
    @User() user: UserModel,
    @Body()
    dto: SetCommentDto
  ) {
    return this.commentsService.createReply(user, dto, commentId)
  }
}
