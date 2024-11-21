import { OmitType } from '@nestjs/mapped-types';
import { User } from 'src/modules/users/schema/users.schema';

class JwtPayloadDto extends OmitType(User, ['password'] as const) {}

export default JwtPayloadDto;
