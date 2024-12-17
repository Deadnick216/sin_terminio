import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NodocenteService } from './nodocente.service';
import { CreateNodocenteDto } from './dto/create-nodocente.dto';
import { UpdateNodocenteDto } from './dto/update-nodocente.dto';

@Controller('nodocente')
export class NodocenteController {
  constructor(private readonly nodocenteService: NodocenteService) {}

  @Post()
  create(@Body() createNodocenteDto: CreateNodocenteDto) {
    return this.nodocenteService.create(createNodocenteDto);
  }

  @Get()
  findAll() {
    return this.nodocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodocenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNodocenteDto: UpdateNodocenteDto) {
    return this.nodocenteService.update(+id, updateNodocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodocenteService.remove(+id);
  }
}