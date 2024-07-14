import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '../resources/auth/auth.service';
import { UserService } from '../resources/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (session && session.jwt) {
      try {

        const data = this.authService.checkToken(session.jwt);
        request.tokenPayload = data;
        request.user = await this.userService.read(data.sub);
        return true;
        
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
