import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  presente: boolean;

  @ManyToOne(() => Estudiante, estudiante => estudiante.asistencias)
  estudiante: Estudiante;
}