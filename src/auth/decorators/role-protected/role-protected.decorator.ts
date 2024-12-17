// src/auth/decorators/role-protected/role-protected.decorator.ts
import { SetMetadata } from '@nestjs/common';// Asegúrate de que importes el enum correcto
import { ValidRoles } from 'src/auth/interfaces';
export const META_ROLES = 'roles';  // Nombre del metadato para los roles

export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);  // Asocia los roles permitidos a la ruta controlada
};
