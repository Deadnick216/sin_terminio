import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnotacionService } from './anotacion.service';
import { CreateAnotacionDto } from './dto/create-anotacion.dto';
import { UpdateAnotacionDto } from './dto/update-anotacion.dto';

@Controller('anotacion')
export class AnotacionController {
  constructor(private readonly anotacionService: AnotacionService) {}

  @Post()
  create(@Body() createAnotacionDto: CreateAnotacionDto) {
    return this.anotacionService.create(createAnotacionDto);
  }

  @Get()
  findAll() {
    return this.anotacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anotacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnotacionDto: UpdateAnotacionDto) {
    return this.anotacionService.update(+id, updateAnotacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anotacionService.remove(+id);
  }
}