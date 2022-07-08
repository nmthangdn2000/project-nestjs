import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../core/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true })
  age: string;

  @Prop({ trim: true })
  gender: string;

  @Prop({ required: true, unique: true, trim: true })
  address: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  role: Role;

  @Prop()
  permission: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
