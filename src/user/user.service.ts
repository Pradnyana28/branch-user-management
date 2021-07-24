import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/validator/create-user.dto';
import { IUser, UserDocument } from './user.interface';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findOne(query: FilterQuery<User>): Promise<UserDocument | null> {
    Logger.debug('QUERY', query);
    return await this.userModel.findOne(query);
  }

  async createUser(user: CreateUserDto): Promise<UserDocument> {
    Logger.debug('QUERY', user);
    try {
      /**
       * Perform all needed checks
       */

      const salt = await genSalt(10);
      const hashPassword = await hash(user.password, salt);

      const res = await this.userModel.create({
        ...user,
        password: hashPassword,
      });

      return res;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async updateUser(
    idUser: string | Types.ObjectId,
    user: any,
  ): Promise<UserDocument> {
    Logger.debug('QUERY', user);
    try {
      const updateParams: IUser = user;
      if (user.password) {
        const salt = await genSalt(10);
        updateParams.password = await hash(user.password, salt);
      }

      Logger.debug('Update params', updateParams);
      await this.userModel.updateOne({ _id: idUser }, updateParams);
      Logger.debug('User data successfully updated');

      const updatedUser = this.userModel.findById(idUser);

      return updatedUser;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
