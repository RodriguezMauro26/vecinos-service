import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseDireccionCiudadanoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  calle: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  numero: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  orientacion: string;

  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @Type(() => Number)
  latitud: number;

  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @Type(() => Number)
  longitud: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  zona: number;
}
