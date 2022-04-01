import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { FilterQuery, Model, Types } from 'mongoose';
import { clone } from 'ramda';
import { hideSensitiveData } from 'src/common/utils';
import { CreateUserDto } from 'src/validator/create-user.dto';
import { UpdateUserDto } from 'src/validator/update-user.dto';
import { IUser, UserDocument } from './user.interface';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findOne(query: FilterQuery<User>): Promise<UserDocument | null> {
    Logger.debug(query, 'QUERY');
    return await this.userModel.findOne(query);
  }

  async createUser(user: CreateUserDto): Promise<UserDocument> {
    Logger.debug(hideSensitiveData(clone(user)), 'QUERY');

    try {
      await this.registerUserValidation(user);

      const salt = await genSalt(10);
      const hashPassword = await hash(user.password, salt);

      const res = await this.userModel.create({
        ...user,
        password: hashPassword,
      });
      Logger.log('SUCCESS createing new user');

      return hideSensitiveData<any>(res.toJSON());
    } catch (e) {
      Logger.debug(e);
      throw e;
    }
  }

  // TODO use as custom validator in create-user.dto.ts
  async registerUserValidation(user: IUser) {
    const existingUsername = await this.userModel.findOne({
      username: user.username,
    });
    if (existingUsername) {
      throw new BadRequestException('Username already registered');
    }

    const existingEmail = await this.userModel.findOne({
      email: user.email,
    });
    if (existingEmail) {
      throw new BadRequestException('Email address already registered');
    }
  }

  async updateUser(
    idUser: string | Types.ObjectId,
    data: UpdateUserDto,
  ): Promise<UserDocument> {
    Logger.debug(hideSensitiveData(clone(data)), 'QUERY');
    try {
      await this.updateUserValidation(idUser, data);

      const updateParams: IUser = data;
      if (data.password) {
        const salt = await genSalt(10);
        updateParams.password = await hash(data.password, salt);
      }

      Logger.debug(updateParams, 'Update params');
      await this.userModel.updateOne({ _id: idUser }, updateParams);
      Logger.log('User data successfully updated');

      const updatedUser = await this.userModel.findById(idUser);

      return hideSensitiveData<any>(updatedUser.toJSON());
    } catch (e) {
      Logger.debug(e);
      throw e;
    }
  }

  // TODO use as custom validator in update-user.dto.ts
  async updateUserValidation(idUser, data: Partial<IUser>) {
    if (data.username) {
      const existingUsername = await this.userModel.findOne({
        username: data.username,
        _id: { $ne: idUser },
      });
      if (existingUsername) {
        throw new BadRequestException('Username already registered');
      }
    }

    if (data.email) {
      const existingEmail = await this.userModel.findOne({
        email: data.email,
        _id: { $ne: idUser },
      });
      if (existingEmail) {
        throw new BadRequestException('Email address already registered');
      }
    }
  }
}
