// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  // Asegúrate de que la entidad User existe
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

// Importa otros módulos que tu servicio necesita
import { EstudianteModule } from '../estudiante/estudiante.module';  // Asegúrate de que este módulo esté importado
import { DocenteModule } from '../docente/docente.module';  // Si es necesario
import { NodocenteModule } from '../nodocente/nodocente.module';  // Si es necesario

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule.forRoot(),  // Carga las variables de entorno
    TypeOrmModule.forFeature([User]),  // Importa el repositorio de User

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),  // Se obtiene desde el archivo .env
          signOptions: { expiresIn: '1d' },  // Configura el tiempo de expiración
        };
      },
    }),

    // Aquí están los otros módulos necesarios:
    EstudianteModule,  // Asegúrate de que se haya importado correctamente
    DocenteModule,  // Si estás trabajando con docentes
    NodocenteModule,  // Si estás trabajando con nodocentes
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],  // Exporte los módulos necesarios
})
export class AuthModule {}
