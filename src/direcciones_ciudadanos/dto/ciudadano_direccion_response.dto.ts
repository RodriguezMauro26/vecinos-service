/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDireccionCiudadanoDto } from './base_direccion_ciudadano.dto';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsDate } from 'class-validator';
export class CiudadanoDireccionResponseDto extends BaseDireccionCiudadanoDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    ciudadano_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    creado_en: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    actualizado_en: Date;
}
