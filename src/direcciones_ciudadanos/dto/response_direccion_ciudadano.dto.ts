import { ApiProperty } from '@nestjs/swagger';
import { BaseDireccionCiudadanoDto } from './base_direccion_ciudadano.dto';
import { CiudadanoDireccionResponseDto } from './ciudadano_direccion_response.dto';
export class ResponseDireccionCiudadanoDto extends BaseDireccionCiudadanoDto {
  @ApiProperty()
  direccion_ciudadano_id: number;

  @ApiProperty()
  creado_en: Date;

  @ApiProperty()
  actualizado_en: Date;

  @ApiProperty()
  ciudadanos?: CiudadanoDireccionResponseDto[];
}
