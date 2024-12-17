import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodocenteService } from './nodocente.service';
import { NodocenteController } from './nodocente.controller';
import { NoDocente } from './entities/nodocente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoDocente])],
  controllers: [NodocenteController],
  providers: [NodocenteService],
  exports: [TypeOrmModule, NodocenteService],
})
export class NodocenteModule {}