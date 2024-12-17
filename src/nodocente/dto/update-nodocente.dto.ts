import { PartialType } from '@nestjs/swagger';
import { CreateNodocenteDto } from './create-nodocente.dto';

export class UpdateNodocenteDto extends PartialType(CreateNodocenteDto) {}
