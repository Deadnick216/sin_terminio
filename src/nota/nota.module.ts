import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { Nota } from './entities/nota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nota])],
  controllers: [NotaController],
  providers: [NotaService],
  exports: [TypeOrmModule, NotaService],
})
export class NotaModule {}