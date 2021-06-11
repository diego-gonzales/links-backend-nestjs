import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LinkDto } from './dto/link.dto';
import { SignInDto } from './dto/signin-dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  };

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().populate('links').exec();
    return users;
  };

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  };

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true, useFindAndModify: false });
    return updatedUser;
  };

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id, { useFindAndModify: false });
    return deletedUser;
  };


  // Para actualizar el array de links que esta por defecto al crear un usuario, agregado un link a su array de links
  async addLink(idUser: string, linkDto: LinkDto): Promise<User> {
    const { link_id } = linkDto;
    const userWithUpdatedLinks = await this.userModel.findByIdAndUpdate(idUser, {
      $push: { links: link_id }
    }, {new: true, useFindAndModify: false});
    return userWithUpdatedLinks;
  };

  // Para actualizar el array de links de un usuario, removiendo un link de su array de links
  async removeLink(idUser: string, linkDto: LinkDto): Promise<User> {
    const { link_id } = linkDto;
    const userWithUpdatedLinks = await this.userModel.findByIdAndUpdate(idUser, {
      $pull: { links: link_id }
    }, { new: true, useFindAndModify: false });

    return userWithUpdatedLinks;
  };

  // Para hacer el logueo de un usuario
  async signInUser(signInDto: SignInDto): Promise<User> {
      const { username } = signInDto;

      const user = await this.userModel.findOne({ username });

      return user;
  };

}
