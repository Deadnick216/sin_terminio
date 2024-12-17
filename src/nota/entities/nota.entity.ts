import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Docente } from '../../docente/entities/docente.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => Estudiante, estudiante => estudiante.notas)
  estudiante: Estudiante;

  @ManyToOne(() => Docente, docente => docente.notas)
  docente: Docente;
}