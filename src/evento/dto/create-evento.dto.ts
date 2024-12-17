import { IsString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsString()
  fecha: string; // Cambiado a string

  @IsString()
  creadoPor: string; // Nombre de quien creó el evento
}