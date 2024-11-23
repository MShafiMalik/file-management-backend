import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { FileType } from '../enums';
import { User } from 'src/modules/users/schema/users.schema';

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
  public _id: string;

  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop({
    type: String,
    required: true,
    enum: FileType,
  })
  type: FileType;

  @Prop()
  size: number;

  @Prop()
  tags: string[];

  @Prop()
  sharedToken: string;

  @Prop()
  views: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const FileSchema = SchemaFactory.createForClass(File);
