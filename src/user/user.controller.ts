import {
  Controller,
  Logger,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from 'src/common/AuthGuard';
import { RpcValidationFilter } from 'src/common/rpc-exception';
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

  @Put(':id')
  @MessagePattern({ role: 'user', cmd: 'update' })
  @UseGuards(AuthGuard)
  @UseFilters(new RpcValidationFilter())
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param() params: Record<string, unknown>,
    @Payload() data: UpdateUserDto,
  ): Promise<IUser> {
    Logger.log('START updating user data', { params, data });
    return this.userService.updateUser(params.id as string, data);
  }
}
