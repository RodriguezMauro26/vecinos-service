import { ApiProperty } from '@nestjs/swagger';
import { BaseCiudadanoDto } from './base_ciudadano.dto';
import { DireccionCiudadanoResponseDto } from './direccion_ciudadano_response.dto';
export class ResponseCiudadanoDto extends BaseCiudadanoDto {
  @ApiProperty()
  ciudadano_id: number;

  @ApiProperty()
  creado_en: Date;

  @ApiProperty()
  actualizado_en: Date;

  @ApiProperty({ type: [DireccionCiudadanoResponseDto] })
  direcciones?: DireccionCiudadanoResponseDto[];
}
