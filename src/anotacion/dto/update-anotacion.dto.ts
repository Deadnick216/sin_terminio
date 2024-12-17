import { PartialType } from '@nestjs/swagger';
import { CreateAnotacionDto } from './create-anotacion.dto';

export class UpdateAnotacionDto extends PartialType(CreateAnotacionDto) {}
