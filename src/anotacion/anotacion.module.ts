import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnotacionService } from './anotacion.service';
import { AnotacionController } from './anotacion.controller';
import { Anotacion } from './entities/anotacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anotacion])],
  controllers: [AnotacionController],
  providers: [AnotacionService],
  exports: [TypeOrmModule, AnotacionService],
})
export class AnotacionModule {}