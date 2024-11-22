import { ApiProperty } from '@nestjs/swagger';
import { BaseCiudadanoDto } from './base_ciudadano.dto';
import { IsArray, ArrayMinSize, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCiudadanoDto extends BaseCiudadanoDto {
  @ApiProperty({ required: false })
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @IsInt({ each: true })
  @Type(() => Number)
  direcciones_ciudadanos_id?: number[];
}
