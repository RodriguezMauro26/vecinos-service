import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
import { BaseDireccionCiudadanoDto } from './base_direccion_ciudadano.dto';

export class CreateDireccionesCiudadanoDto extends BaseDireccionCiudadanoDto {
  @ApiProperty({ required: false })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @IsOptional()
  ciudadanos_id?: number[];
}
