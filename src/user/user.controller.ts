import { Body, Controller, Delete, Get, HttpCode, Param, Put, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { User } from './decorators/user.decorator';
import { JsonSettingsDto, UpdateUserDto } from './dto/user-update.dto';
import { JsonSettings, UserModel } from './user.model';
import { UserService } from './user.service'
import { UpdateUserPasswordDto } from './dto/user-update-password.dto';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get('profile/:id')
  @Auth('USER')
  async getProfile(@Param('id', IdValidationPipe) id: string) {
    return this.userService.getProfile(id)
  }

  @Get('profile/favorites')
  @Auth()
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return this.userService.getFavoriteProduct(_id)
  }

  @Put('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toogleFavorite(@Body('productId', IdValidationPipe) productId: Types.ObjectId, @User() user: UserModel) {
    return this.userService.toogleFavorite(productId, user)
  }

  @Put('profile/favorites/remove')
  @HttpCode(200)
  @Auth()
  async removeFavorite(@User() user: UserModel) {
    return this.userService.removeFavorite(user)
  }


  @Get('count')
  @Auth('ADMIN')
  async getCountUsers() {
    return this.userService.getCount()
  }

  @Get()
  @Auth('ADMIN')
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('ADMIN')
  async getUserIdByAdmin(@Param('id', IdValidationPipe) id: string) {
    return this.userService.byId(id)
  }

  
  @Get('init/:id')
  @Auth('USER')
  async getUserIdByUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.initById(id)
  }

  @Put('settings/:id')
  @Auth('USER')
  async updateJsonSettings(@Param('id', IdValidationPipe) id: string, @Body() jsonSettings: JsonSettingsDto) {
    return this.userService.updateJsonSettings(id, jsonSettings)
  }


  @UsePipes(new ValidationPipe())
  @Put('profile/:id')
  @HttpCode(200)
  @Auth('USER')
  async updateProfile(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @Put('profile/password/:id')
  @HttpCode(200)
  @Auth('USER')
  async updatePassword(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateUserPasswordDto) {
    return this.userService.updatePassword(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async updateUser(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.delete(id)
  }
}

