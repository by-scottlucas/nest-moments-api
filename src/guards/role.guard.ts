import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { USERS_KEY } from '../decorators/role.decorator';
import { UserEnum } from '../enums/user.enum';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext) {

        const requeridRoles = this.reflector.getAllAndOverride<UserEnum[]>(USERS_KEY, [context.getHandler(), context.getClass()]);

        if (!requeridRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const rolesFiltred = requeridRoles.filter(role => role === user.role);

        return rolesFiltred.length > 0

    }

}