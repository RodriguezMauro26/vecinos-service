import { PartialType } from '@nestjs/swagger';
import { CreateDireccionesCiudadanoDto } from './create_direcciones_ciudadano.dto';

export class UpdateDireccionesCiudadanoDto extends PartialType(
  CreateDireccionesCiudadanoDto,
) {}
