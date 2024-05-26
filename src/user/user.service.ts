import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash, compare } from 'bcryptjs';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { JsonSettingsDto, UpdateUserDto } from './dto/user-update.dto';
import { UserModel } from './user.model';
import { UpdateUserPasswordDto } from './dto/user-update-password.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>) { }

  async byId(_id: string) {
    const user = await this.UserModel.findById(_id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }


  async initById(_id: string) {
    const user = await this.UserModel.findById(_id)
    if (!user) throw new NotFoundException('User not found')
    return this.returnUserFields(user)
  }

  async getProfile(_id: string) {
    const user = await this.UserModel.findById(_id)
    
    if (!user) throw new NotFoundException('User not found')

    return {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      description: user.description,
      email: user.email,
      phone_number: user.phone_number,
      country: user.country,
      city: user.city,
      address: user.address,
      age: user.age,
      sex: user.sex,
      currency: user.currency,
      avatar: user.avatar,
      createdAt: user.createdAt,
      features: user.features,
      jsonSettings: user.jsonSettings
    }
  }

  async updatePassword(_id: string, dto: UpdateUserPasswordDto) {

    const { newPassword, oldPassword} = dto;

    const salt = await genSalt(10)
    const user = await this.UserModel.findById(_id);

    if (!user) throw new NotFoundException('Пользователь не найден');

    const isMatch = await compare(oldPassword, user.password);

    if (!isMatch) {
      throw new NotFoundException('Неправильный пароль');
    }

    user.password = await hash(newPassword, salt);

    await user.save()


    return
   
  }

  async updateProfile(_id: string, dto: UpdateUserDto) {
    const isSameUser = await this.UserModel.findOne({ email: dto.email })

    if (isSameUser && String(_id) !== String(isSameUser._id)) {
      throw new NotFoundException('Эта почта уже занята на сайте')
    }

    const updateUser = await this.UserModel.findByIdAndUpdate(_id, dto, { new: true }).exec()

    if (!updateUser) throw new NotFoundException('Пользователь не найден')

    return {
      _id: updateUser._id,
      username: updateUser.username,
      firstname: updateUser.firstname,
      lastname: updateUser.lastname,
      description: updateUser.description,
      email: updateUser.email,
      phone_number: updateUser.phone_number,
      country: updateUser.country,
      city: updateUser.city,
      address: updateUser.address,
      age: updateUser.age,
      sex: updateUser.sex,
      currency: updateUser.currency,
      avatar: updateUser.avatar,
      createdAt: updateUser.createdAt,
      features: updateUser.features,
      jsonSettings: updateUser.jsonSettings
    }
  }
  async updateJsonSettings(_id: string, jsonSettings: JsonSettingsDto) {
    const user = await this.UserModel.findById(_id);

    if (!user) throw new NotFoundException('Пользователь не найден')

    user.jsonSettings = jsonSettings

    await user.save()

    return jsonSettings;
  }

  async getCount() {
    return this.UserModel.find().count().exec()
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) options = { $or: [{ email: new RegExp(searchTerm, 'i') }] }
    return this.UserModel.find(options).select('-password -updatedAt -__v').sort({ createdAt: 'desc' }).exec()
  }

  async delete(id: string) {
    return this.UserModel.findByIdAndDelete(id).exec()
  }



  async removeFavorite(user: UserModel) {
    const { _id} = user

    await this.UserModel.findByIdAndUpdate(_id, {
      favorites: []
    }).exec()
  }


  async toogleFavorite(productId: Types.ObjectId, user: UserModel) {

    const { _id, favorites } = user

    await this.UserModel.findByIdAndUpdate(_id, {
      favorites: favorites.includes(productId) ? favorites.filter(id => String(id) !== String(productId)) : [...favorites, productId]
    })
  }


  async getFavoriteProduct(_id: Types.ObjectId) {
    return await this.UserModel.findById(_id, 'favorites').populate({
      path: 'favorites', populate: {
        path: 'category brand'
      }
    }).exec().then(data => data.favorites)
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      username: user.username,
      description: user.description,
      email: user.email,
      avatar: user.avatar,
      roles: user.roles,
      features: user.features,
      jsonSettings: user.jsonSettings
    }
  }
}
