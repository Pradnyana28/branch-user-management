import { Document } from 'mongoose';
import { User } from './user.schema';

export type UserDocument = User & Document;

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
}
