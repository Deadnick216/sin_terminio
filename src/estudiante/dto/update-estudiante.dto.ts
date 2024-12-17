import { PartialType } from '@nestjs/swagger';
import { CreateEstudianteDto } from './create-estudiante.dto';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  asignaturas?: number[];
  notas?: number[];
  asistencias?: number[];
  anotaciones?: number[];
}
