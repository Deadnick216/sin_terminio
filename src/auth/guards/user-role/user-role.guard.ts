// src/auth/guards/user-role.guard.ts
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected/role-protected.decorator';  // Nombre del metadato
import { ValidRoles } from 'src/auth/interfaces';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';  // Importa la interfaz JwtPayload

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,  // Para leer los metadatos de la ruta
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Obtén los roles permitidos para la ruta desde los metadatos
    const validRoles: ValidRoles[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!validRoles || validRoles.length === 0) return true;  // Si no hay roles definidos, permite el acceso

    const req = context.switchToHttp().getRequest();
    const user = req.user as JwtPayload;  // Usa la interfaz JwtPayload

    if (!user) throw new BadRequestException('User not found');  // Si no se encuentra al usuario

    // Verifica si el rol del usuario está en los roles permitidos
    if (validRoles.includes(user.tipo as ValidRoles)) {  // `user.tipo` es el rol del usuario
      return true;  // Si el rol es válido, permite el acceso
    }

    // Si el rol no es válido, lanza una excepción
    throw new ForbiddenException(`You ${user.id} need a valid role: [${validRoles.join(', ')}]`);
  }
}
