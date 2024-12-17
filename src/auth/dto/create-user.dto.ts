import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsString()
  rut: string;
}