import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/metatata/role.medata';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRrole: any) {
    return roles.some((role) => role === userRrole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const role = user?.['Data']['IsRole'];

    if (request) {
      if (roles) {
        return this.matchRoles(roles, role);
      }
      return true;
    }
  }
}
