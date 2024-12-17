import { Entity, OneToMany, ManyToMany } from 'typeorm';
import { Nota } from '../../nota/entities/nota.entity';
import { Asistencia } from '../../asistencia/entities/asistencia.entity';
import { Anotacion } from '../../anotacion/entities/anotacion.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';
import { User } from 'src/auth/entities/user.entity'; // Importa la clase base

@Entity()
export class Estudiante extends User {
  @OneToMany(() => Nota, (nota) => nota.estudiante)
  notas: Nota[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudiante)
  asistencias: Asistencia[];

  @OneToMany(() => Anotacion, (anotacion) => anotacion.estudiante)
  anotaciones: Anotacion[];

  @ManyToMany(() => Asignatura, (asignatura) => asignatura.estudiantes)
  asignaturas: Asignatura[];
}
