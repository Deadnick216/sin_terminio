import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { GetUser, Auth } from './decorators/index';
import { IncomingHttpHeaders } from 'http';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { JwtPayload, ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';
import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto';
import { CreateDocenteDto } from 'src/docente/dto/create-docente.dto';
import { CreateNodocenteDto } from 'src/nodocente/dto/create-nodocente.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateEstudianteDto | CreateDocenteDto | CreateNodocenteDto,
  ) {
    const tipo = createUserDto.tipo;
    try {
      return await this.authService.create(createUserDto, tipo);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async loginUser(
    @Body() body: { rut?: string; correo?: string; contrasena?: string; tipo?: string },
  ) {
    if (!body.tipo) {
      throw new HttpException('Tipo de usuario es requerido', HttpStatus.BAD_REQUEST);
    }

    try {
      switch (body.tipo) {
        case 'estudiante':
          if (!body.rut) {
            throw new HttpException('RUT es requerido para estudiantes', HttpStatus.BAD_REQUEST);
          }
          return await this.authService.loginEstudiante(body.rut); 
        case 'docente':
        case 'nodocente':
          if (!body.correo || !body.contrasena) {
            throw new HttpException('Correo y contraseña son requeridos', HttpStatus.BAD_REQUEST);
          }
          return await this.authService.login({ correo: body.correo, contrasena: body.contrasena, tipo: body.tipo });
        default:
          throw new HttpException('Tipo de usuario no válido', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard())
  @Get('check-auth-status')
  checkAuthStatus(@GetUser() user: JwtPayload) {
    return this.authService.checkAuthStatus(user);
  }
}
