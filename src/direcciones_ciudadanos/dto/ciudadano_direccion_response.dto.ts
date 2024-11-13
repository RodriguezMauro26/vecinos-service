/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { BaseCiudadanoDto } from 'src/ciudadanos/dto/base_ciudadano.dto';
export class CiudadanoDireccionResponseDto extends BaseCiudadanoDto {
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
