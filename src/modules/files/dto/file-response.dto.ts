import { OmitType } from '@nestjs/mapped-types';
import { File } from '../schema/files.schema';

class FileResponseDto extends OmitType(File, ['sharedToken'] as const) {}

export default FileResponseDto;
