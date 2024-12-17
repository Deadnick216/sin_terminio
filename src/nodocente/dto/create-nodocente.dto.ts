import { IsString } from "class-validator";
import { CreateUserDto } from "src/auth/dto";
import { UserType } from "src/auth/user-type.enum";

export class CreateNodocenteDto extends CreateUserDto {
  @IsString()
  contrasena: string;

  @IsString()
  rut: string;

  @IsString()
  descripcion: string;

  tipo: UserType = UserType.Nodocente;
}