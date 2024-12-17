
import { CreateUserDto } from 'src/auth/dto';
import { UserType } from 'src/auth/user-type.enum';
import { IsString, IsEmail } from 'class-validator';

export class CreateEstudianteDto extends CreateUserDto {
  @IsString()
  rut: string;

  tipo: UserType = UserType.Estudiante;  // Asignación de tipo específico
}
