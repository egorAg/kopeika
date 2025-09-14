import { Request } from 'express';
import { UserStatus } from '../../modules/user/domain/entities/user.entity';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    sessionId: string;
    email: string;
    isActive: UserStatus;
  };
}
