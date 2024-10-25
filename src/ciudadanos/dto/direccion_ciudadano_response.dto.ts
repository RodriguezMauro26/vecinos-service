/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { BaseDireccionCiudadanoDto } from 'src/direcciones_ciudadanos/dto/base_direccion_ciudadano.dto';
export class DireccionCiudadanoResponseDto extends BaseDireccionCiudadanoDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    direccion_ciudadano_id: number;

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
