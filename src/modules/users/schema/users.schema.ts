import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @IsNotEmpty()
  @IsMongoId()
  public _id: string;

  @Prop()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
