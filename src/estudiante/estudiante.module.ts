import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { Nota } from '../nota/entities/nota.entity';
import { Asistencia } from '../asistencia/entities/asistencia.entity';
import { Anotacion } from '../anotacion/entities/anotacion.entity';
import { AsignaturaModule } from '../asignatura/asignatura.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante, Asignatura, Nota, Asistencia, Anotacion]),
    AsignaturaModule,
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule, EstudianteService],
})
export class EstudianteModule {}