import { Request } from 'express';
import { UserStatus } from '../../modules/user/domain/entities/user.entity';

export interface CurrentUser {
  userId: string;
  sessionId: string;
  email: string;
  status: UserStatus;
}

export interface RequestWithUser extends Request {
  user: CurrentUser;
}
