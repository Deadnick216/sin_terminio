import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Docente } from '../docente/entities/docente.entity';
import { NoDocente } from '../nodocente/entities/nodocente.entity';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
    @InjectRepository(NoDocente)
    private readonly noDocenteRepository: Repository<NoDocente>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Crear un nuevo usuario según su tipo
  async create(createUserDto: any, tipo: string) {
    switch (tipo) {
      case 'estudiante':
        return this.createEstudiante(createUserDto);
      case 'docente':
        return this.createDocente(createUserDto);
      case 'nodocente':
        return this.createNoDocente(createUserDto);
      default:
        throw new BadRequestException('Tipo de usuario inválido.');
    }
  }

  private async createEstudiante(createUserDto: any) {
    const nuevoEstudiante = this.estudianteRepository.create(createUserDto);
    return await this.estudianteRepository.save(nuevoEstudiante);
  }

  private async createDocente(createUserDto: any) {
    const { contrasena, ...resto } = createUserDto;
    const hash = await bcrypt.hash(contrasena, 10);
    const nuevoDocente = this.docenteRepository.create({ ...resto, contrasena: hash });
    return await this.docenteRepository.save(nuevoDocente);
  }

  private async createNoDocente(createUserDto: any) {
    const { contrasena, ...resto } = createUserDto;
    const hash = await bcrypt.hash(contrasena, 10);
    const nuevoNoDocente = this.noDocenteRepository.create({ ...resto, contrasena: hash });
    return await this.noDocenteRepository.save(nuevoNoDocente);
  }

  // Login de usuarios según su tipo
  async login(loginUserDto: LoginUserDto) {
    const { rut, correo, contrasena, tipo } = loginUserDto;

    let user;
    switch (tipo) {
      case 'estudiante':
        user = await this.loginEstudiante(rut);
        break;
      case 'docente':
        user = await this.loginDocente(correo, contrasena);
        break;
      case 'nodocente':
        user = await this.loginNoDocente(correo, contrasena);
        break;
      default:
        throw new BadRequestException('Tipo de usuario inválido.');
    }

    return { ...user, token: this.getJwtToken({ id: user.id, tipo: tipo }) };
  }

  // Verificación de estado de autenticación
  checkAuthStatus(user: JwtPayload) {
    return {
      ok: true,
      message: 'Usuario autenticado',
      user,
    };
  }

  // Métodos de login privados
  public async loginEstudiante(rut: string) {
    const estudiante = await this.estudianteRepository.findOne({ where: { rut } });
    if (!estudiante) {
      throw new UnauthorizedException('Estudiante no encontrado.');
    }
    return estudiante;
  }

  private async loginDocente(correo: string, contrasena: string) {
    const docente = await this.docenteRepository.findOne({
      where: { correo },
      select: ['id', 'correo', 'contrasena'],
    });

    if (!docente || !(await bcrypt.compare(contrasena, docente.contrasena))) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    return docente;
  }

  private async loginNoDocente(correo: string, contrasena: string) {
    const noDocente = await this.noDocenteRepository.findOne({
      where: { correo },
      select: ['id', 'correo', 'contrasena'],
    });

    if (!noDocente || !(await bcrypt.compare(contrasena, noDocente.contrasena))) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    return noDocente;
  }

  // Generación de token JWT
  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  // Método corregido para buscar un usuario por ID usando userRepository
  async findById(id: string): Promise<User | null> {
    const userId = +id;
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
