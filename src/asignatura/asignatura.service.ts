import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { Asignatura } from './entities/asignatura.entity';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  create(createAsignaturaDto: CreateAsignaturaDto) {
    const asignatura = this.asignaturaRepository.create(createAsignaturaDto);
    return this.asignaturaRepository.save(asignatura);
  }

  findAll() {
    return this.asignaturaRepository.find();
  }

  findOne(id: number) {
    return this.asignaturaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) {
    const asignatura = await this.asignaturaRepository.findOne({ where: { id } });

    if (!asignatura) {
      throw new NotFoundException(`Asignatura with ID ${id} not found`);
    }

    Object.assign(asignatura, updateAsignaturaDto);
    return this.asignaturaRepository.save(asignatura);
  }

  remove(id: number) {
    return this.asignaturaRepository.delete(id);
  }
}