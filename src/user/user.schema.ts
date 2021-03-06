import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from './user.interface';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @Prop() name: string;
  @Prop() username: string;
  @Prop() password: string;
  @Prop() email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
