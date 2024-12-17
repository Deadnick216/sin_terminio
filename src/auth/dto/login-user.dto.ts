import { IsString, IsOptional } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsOptional() // Solo requerido para estudiantes
  rut?: string;

  @IsString()
  @IsOptional() // Solo requerido para docentes y no docentes
  correo?: string;

  @IsString()
  @IsOptional() // Solo requerido para docentes y no docentes
  contrasena?: string;

  @IsString()
  tipo: 'estudiante' | 'docente' | 'nodocente';
}
