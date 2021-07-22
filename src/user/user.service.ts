import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from './user.interface';
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

  async createUser(user: any): Promise<UserDocument> {
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
}
