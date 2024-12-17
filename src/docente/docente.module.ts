import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { Docente } from './entities/docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocenteController],
  providers: [DocenteService],
  exports: [TypeOrmModule, DocenteService],
})
export class DocenteModule {}