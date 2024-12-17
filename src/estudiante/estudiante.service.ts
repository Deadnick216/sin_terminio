import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    const estudiante = this.estudianteRepository.create(createEstudianteDto);
    return this.estudianteRepository.save(estudiante);
  }

  findAll() {
    return this.estudianteRepository.find();
  }

  findOne(id: number) {
    return this.estudianteRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const { nombre, correo, rut } = updateEstudianteDto;
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante with ID ${id} not found`);
    }

    estudiante.nombre = nombre;
    estudiante.correo = correo;
    estudiante.rut = rut;

    return this.estudianteRepository.save(estudiante);
  }

  remove(id: number) {
    return this.estudianteRepository.delete(id);
  }
}