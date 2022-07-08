import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  userName: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  role: Role;

  @Prop()
  permission: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
