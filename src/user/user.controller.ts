import {
  Controller,
  Logger,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcValidationFilter } from 'src/exception/rpc-exception';
import { CreateUserDto } from 'src/validator/create-user.dto';
import { UpdateUserDto } from 'src/validator/update-user.dto';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<IUser> {
    Logger.log('START getting user detail', data);
    return this.userService.findOne({ username: data.username });
  }

  @Post()
  @MessagePattern({ role: 'user', cmd: 'create' })
  @UseFilters(new RpcValidationFilter())
  @UsePipes(ValidationPipe)
  createUser(@Payload() data: CreateUserDto): Promise<IUser> {
    Logger.log('START creating user data', data);
    return this.userService.createUser(data);
  }

  @MessagePattern({ role: 'user', cmd: 'update' })
  updateUser(data: UpdateUserDto): Promise<IUser> {
    Logger.log('START updating user data', data);
    return this.userService.updateUser(data.idUser, data);
  }
}
