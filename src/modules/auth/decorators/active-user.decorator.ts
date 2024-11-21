import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadDto } from '../dto';

export const ActiveUser = createParamDecorator(
  (_, context: ExecutionContext): JwtPayloadDto => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
