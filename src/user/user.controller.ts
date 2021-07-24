import {
  Controller,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Request } from 'express';
import { RpcValidationFilter } from 'src/exception/rpc-exception';
import { CreateUserDto } from 'src/validator/create-user.dto';
import { UpdateUserDto } from 'src/validator/update-user.dto';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
  async updateUser(
    @Req() req: Request,
    @Param() params: Record<string, unknown>,
    @Payload() data: UpdateUserDto,
  ): Promise<IUser> {
    Logger.log('authentication', req.headers['authorization']);
    Logger.log('START updating user data', { params, data });
    const isValid = await this.jwtService.verify(req.headers['authorization']);
    console.log(isValid, 'isvalid');
    return this.userService.updateUser(data.idUser, data);
  }
}
