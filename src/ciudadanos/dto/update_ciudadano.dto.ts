/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateCiudadanoDto } from './create_ciudadano.dto';

export class UpdateCiudadanoDto extends PartialType(CreateCiudadanoDto) { }
