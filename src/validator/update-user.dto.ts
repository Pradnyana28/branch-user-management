import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUser } from 'src/user/user.interface';

export class UpdateUserDto implements IUser {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsAlphanumeric()
  @MinLength(6)
  @IsOptional()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  username: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  phone: string;
}
