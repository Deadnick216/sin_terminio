import { IsString } from "class-validator";
import { CreateUserDto } from "src/auth/dto";
import { UserType } from "src/auth/user-type.enum";

export class CreateDocenteDto extends CreateUserDto {
  @IsString()
  contrasena: string;

  @IsString()
  rut: string;

  tipo: UserType = UserType.Docente;
}