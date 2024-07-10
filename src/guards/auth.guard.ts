import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { AuthService } from "../resources/auth/auth.service";
import { UserService } from "../resources/user/user.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        try {

            const data = this.authService.checkToken((authorization ?? '').split(' ')[1])

            request.tokenPayload = data;

            request.user = await this.userService.read(data.sub);

            return true;

        } catch (error) {
            return false;
        }
    }

}