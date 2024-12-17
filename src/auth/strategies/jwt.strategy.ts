import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service'; // Importa AuthService
import { User } from '../entities/user.entity'; // Asegúrate de que esta ruta sea correcta
import { JwtPayload } from '../interfaces/jwt-payload.interface'; // Define tu interfaz de payload

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Usa tu variable de entorno para el secreto
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    // Lógica de autenticación: buscar el usuario

    const user = await this.authService.findById(id.toString());

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user; // Retorna el usuario si todo está correcto
  }
}
