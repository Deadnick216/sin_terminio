import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AnotacionModule } from './anotacion/anotacion.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { DocenteModule } from './docente/docente.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { NotaModule } from './nota/nota.module';
import { NodocenteModule } from './nodocente/nodocente.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AnotacionModule,
    AsignaturaModule,
    AsistenciaModule,
    DocenteModule,
    EstudianteModule,
    NotaModule,
    NodocenteModule,
    EventoModule,
  ],
})
export class AppModule {}