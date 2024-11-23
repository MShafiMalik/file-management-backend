import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File } from './schema/files.schema';
import mongoose, { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import FileResponseDto from './dto/file-response.dto';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async uploadFile(userId: string, file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file format.');
    }

    const serverUrl = process.env.SERVER_URL;

    try {
      const filePayload = {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        path: `${serverUrl}/${file.path}`,
        tags: [],
        sharedToken: randomUUID(),
        views: 0,
        user: userId,
      };

      await this.fileModel.create(filePayload);
      return 'File Uploaded Successfully';
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  async getAllByUser(userId: string): Promise<FileResponseDto[]> {
    const files = await this.fileModel.find({ user: userId }).lean().exec();
    return files.map((file) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sharedToken, ...rest } = file; // Disable unused-vars rule here
      return rest;
    });
  }

  async addView(userId: string, fileId: string): Promise<string> {
    const mongoFileId = new mongoose.Types.ObjectId(fileId);
    const mongoUserId = new mongoose.Types.ObjectId(userId);

    const file = await this.fileModel.findOne({
      _id: mongoFileId,
      user: mongoUserId,
    });
    if (!file) throw new NotFoundException('File Not Found');

    try {
      file.views += 1;
      await file.save();
      return 'View Added!';
    } catch (error) {
      throw new InternalServerErrorException('Failed to add view!');
    }
  }
}
