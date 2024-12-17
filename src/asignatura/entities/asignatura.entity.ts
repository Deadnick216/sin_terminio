import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Docente } from '../../docente/entities/docente.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity()
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Docente, docente => docente.asignaturas)
  docente: Docente;

  @ManyToMany(() => Estudiante, estudiante => estudiante.asignaturas)
  @JoinTable()
  estudiantes: Estudiante[];
}