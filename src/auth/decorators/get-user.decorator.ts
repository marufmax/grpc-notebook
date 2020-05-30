import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator((data, req: ExecutionContext) => {
  return req.switchToHttp().getRequest().user;
});
