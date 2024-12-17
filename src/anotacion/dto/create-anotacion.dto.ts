import { IsString, IsInt } from 'class-validator';

export class CreateAnotacionDto {
  @IsString()
  fecha: string;

  @IsString()
  descripcion: string;

  @IsInt()
  docenteId: number;

  @IsInt()
  estudianteId: number;
}