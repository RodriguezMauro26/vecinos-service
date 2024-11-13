/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class FindCiudadanoQueryDto {
  @ApiPropertyOptional({
    description: 'Cantidad de ciudadanos a obtener',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El parámetro take debe ser un número entero' })
  @Type(() => Number)
  take?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de ciudadanos a omitir',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El parámetro skip debe ser un número entero' })
  @Type(() => Number)
  skip?: number;

  @ApiPropertyOptional({
    description: 'Campo para ordenar',
    enum: ['cuil', 'creado_en', 'actualizado_en'],
  })
  @IsOptional()
  @IsString({ message: 'El parámetro orderBy debe ser un string' })
  @IsIn(['cuil', 'creado_en', 'actualizado_en'], {
    message: 'El parámetro orderBy debe ser cuil/creado_en/actualizado_en',
    always: false,
  })
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString({ message: 'El parámetro order debe ser un string' })
  @IsIn(['asc', 'desc'], {
    message: 'El parámetro order debe ser asc/desc',
    always: false,
  })
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Campo para filtrar',
    enum: ['cuil', 'nombre', 'apellido'],
  })
  @IsOptional()
  @IsString({ message: 'El parámetro filterBy debe ser un string' })
  @IsIn(['cuil', 'nombre', 'apellido'], {
    message: 'El parámetro filterBy debe ser cuil/nombre/apellido',
    always: false,
  })
  filterBy?: string;

  @ApiPropertyOptional({
    description: 'Valor para el filtro',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El parámetro filter debe ser un string' })
  @Type(() => String)
  filter?: string;
}
