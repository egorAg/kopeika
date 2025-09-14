import { User } from '../../modules/user/domain/entities/user.entity';
import { UserBlockedException } from '@shared/exceptions/user-blocked.exception';
import { UserInactiveException } from '@shared/exceptions/user-inactive.exception';

export const IsUserBlockedGuard = (user?: User) => {
  if (!user) {
    return;
  }

  if (user.status === 'blocked') {
    throw UserBlockedException();
  }

  if (user.status === 'inactive') {
    throw UserInactiveException();
  }
};
