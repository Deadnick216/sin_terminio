import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';
import { Nota } from '../../nota/entities/nota.entity';
import { Anotacion } from '../../anotacion/entities/anotacion.entity';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  contrasena: string;

  @Column()
  rut: string;

  @Column({ default: 'Docente' })
  tipo: string;

  @OneToMany(() => Asignatura, asignatura => asignatura.docente)
  asignaturas: Asignatura[];

  @OneToMany(() => Nota, nota => nota.docente)
  notas: Nota[];

  @OneToMany(() => Anotacion, anotacion => anotacion.docente)
  anotaciones: Anotacion[];
}