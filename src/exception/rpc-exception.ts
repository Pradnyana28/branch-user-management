import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ServerResponse } from 'http';
import { Response } from 'express';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (response instanceof ServerResponse) {
      response.status(status).json(exception.getResponse());
    } else {
      return new RpcException(exception.getResponse());
    }
  }
}
