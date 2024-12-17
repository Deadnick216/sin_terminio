import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Docente } from '../../docente/entities/docente.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity()
export class Anotacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  descripcion: string;

  @ManyToOne(() => Docente, docente => docente.anotaciones)
  docente: Docente;

  @ManyToOne(() => Estudiante, estudiante => estudiante.anotaciones)
  estudiante: Estudiante;
}