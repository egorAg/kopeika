import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { USER_REPOSITORY } from '../../user/domain/repositories/user.repository';
import type { IUserRepository } from '../../user/domain/repositories/user.repository';
import type { RequestWithUser } from '@shared/auth/request-with-user';
import { IsUserBlockedGuard } from '@shared/validators/is-user-blocked.guard';
import { UserInactiveException } from '@shared/exceptions/user-inactive.exception';

@Injectable()
export class UserStatusInterceptor implements NestInterceptor {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly users: IUserRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const path = req.url;
    if (path.startsWith('/auth')) {
      return next.handle(); // не проверяем на auth-роутах
    }

    // если Guard положил user → проверяем в базе
    if (req.user?.userId) {
      const user = await this.users.findById(req.user.userId);

      if (!user) {
        throw UserInactiveException();
      }

      IsUserBlockedGuard(user);

      // обновляем req.user свежим статусом
      req.user.status = user.status;
    }

    return next.handle();
  }
}
