import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  create(createEventoDto: CreateEventoDto) {
    const evento = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(evento);
  }

  findAll() {
    console.log('findAll called');
    return this.eventoRepository.find();
  }

  findOne(id: number) {
    console.log(`findOne called with id: ${id}`);
    return this.eventoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    console.log(`update called with id: ${id}`);
    const evento = await this.eventoRepository.preload({
      id,
      ...updateEventoDto,
    });
    if (!evento) {
      throw new NotFoundException(`Evento with ID ${id} not found`);
    }
    return this.eventoRepository.save(evento);
  }

  remove(id: number) {
    console.log(`remove called with id: ${id}`);
    return this.eventoRepository.delete(id);
  }
}