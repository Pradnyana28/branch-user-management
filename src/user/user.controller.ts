import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<IUser> {
    Logger.log('START getting user detail', data);
    return this.userService.findOne({ username: data.username });
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  createUser(data: any): Promise<IUser> {
    Logger.log('START creating user data', data);
    return this.userService.createUser(data);
  }
}
