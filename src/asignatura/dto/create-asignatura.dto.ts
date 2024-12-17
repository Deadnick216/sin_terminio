import { IsString } from 'class-validator';

export class CreateAsignaturaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}