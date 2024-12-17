import { IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateAsistenciaDto {
  @IsString()
  fecha: string;

  @IsBoolean()
  presente: boolean;

  @IsInt()
  estudianteId: number;
}