import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnotacionDto } from './dto/create-anotacion.dto';
import { UpdateAnotacionDto } from './dto/update-anotacion.dto';
import { Anotacion } from './entities/anotacion.entity';
import * as moment from 'moment';

@Injectable()
export class AnotacionService {
  constructor(
    @InjectRepository(Anotacion)
    private readonly anotacionRepository: Repository<Anotacion>,
  ) {}

  create(createAnotacionDto: CreateAnotacionDto) {
    const { fecha, ...rest } = createAnotacionDto;
    const currentDate = moment();
    const anotacionDate = moment(fecha, 'DD [de] MMMM').set({
      hour: currentDate.hour(),
      minute: currentDate.minute(),
      second: currentDate.second(),
    }).toDate();

    const anotacion = this.anotacionRepository.create({
      ...rest,
      fecha: anotacionDate,
    });
    return this.anotacionRepository.save(anotacion);
  }

  findAll() {
    return this.anotacionRepository.find();
  }

  findOne(id: number) {
    return this.anotacionRepository.findOne({ where: { id } });
  }

  update(id: number, updateAnotacionDto: UpdateAnotacionDto) {
    return this.anotacionRepository.update(id, updateAnotacionDto);
  }

  remove(id: number) {
    return this.anotacionRepository.delete(id);
  }
}