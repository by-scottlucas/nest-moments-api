import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) {

        const requeridRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requeridRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const rolesFiltred = requeridRoles.filter(tipo_usuario => tipo_usuario === user.tipo_usuario);

        return rolesFiltred.length > 0

    }

}