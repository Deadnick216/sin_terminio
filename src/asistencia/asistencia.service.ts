import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import * as moment from 'moment';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
  ) {}

  create(createAsistenciaDto: CreateAsistenciaDto) {
    const { fecha, ...rest } = createAsistenciaDto;
    const asistenciaDate = moment(fecha, 'DD [de] MMMM').toDate();
    const asistencia = this.asistenciaRepository.create({
      ...rest,
      fecha: asistenciaDate,
    });
    return this.asistenciaRepository.save(asistencia);
  }

  findAll() {
    return this.asistenciaRepository.find();
  }

  findOne(id: number) {
    return this.asistenciaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    const { fecha, ...rest } = updateAsistenciaDto;
    const asistenciaDate = moment(fecha, 'DD [de] MMMM').toDate();
    const asistencia = await this.asistenciaRepository.preload({
      id,
      ...rest,
      fecha: asistenciaDate,
    });
    if (!asistencia) {
      throw new NotFoundException(`Asistencia with ID ${id} not found`);
    }
    return this.asistenciaRepository.save(asistencia);
  }

  remove(id: number) {
    return this.asistenciaRepository.delete(id);
  }
}