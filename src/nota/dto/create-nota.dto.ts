import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateNotaDto {
  @IsInt()
  @Min(1)
  @Max(7)
  valor: number;

  @IsString()
  descripcion: string;

  @IsInt()
  estudianteId: number;

  @IsInt()
  docenteId: number;
}