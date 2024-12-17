import { Entity, Column } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class NoDocente extends User {
  @Column({ nullable: true })
  descripcion: string;

  @Column()
  departamento: string; // Ejemplo: Mantenimiento, Administrativo, etc.
}