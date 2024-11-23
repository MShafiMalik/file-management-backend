import {
  Controller,
  Get,
  Post,
  UploadedFile,
  BadRequestException,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileType } from './enums';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { JwtPayloadDto } from '../auth/dto';
import FileResponseDto from './dto/file-response.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        // Allowed MIME types for images and videos
        if (Object.values(FileType).includes(file.mimetype as FileType)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Invalid file type. Only images and videos are allowed.',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 500 * 1024 * 1024, // 500 MB limit
      },
    }),
  )
  async uploadFile(
    @ActiveUser() user: JwtPayloadDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return await this.filesService.uploadFile(user._id, file);
  }

  @Get('get-by-user')
  async getAllByUser(
    @ActiveUser() user: JwtPayloadDto,
  ): Promise<FileResponseDto[]> {
    return await this.filesService.getAllByUser(user._id);
  }

  @Get('add-view/:id')
  async addView(
    @ActiveUser() user: JwtPayloadDto,
    @Param() id: string,
  ): Promise<string> {
    return await this.filesService.addView(user._id, id);
  }
}
