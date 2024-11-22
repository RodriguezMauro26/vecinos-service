import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class BaseCiudadanoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/)
  @Type(() => String)
  cuil: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  apellido: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Matches(/^\+?[0-9]{10,15}$/)
  telefono: string;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  es_vecino: boolean;
}
