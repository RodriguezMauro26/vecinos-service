/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { DireccionesCiudadanosService } from './direcciones_ciudadanos.service';
import { CreateDireccionesCiudadanoDto } from './dto/create_direcciones_ciudadano.dto';
import { UpdateDireccionesCiudadanoDto } from './dto/update_direcciones_ciudadano.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDireccionCiudadanoDto } from './dto/response_direccion_ciudadano.dto';
import { FindDireccionCiudadanoQueryDto } from './dto/find_direccion_ciudadano_query.dto';

@ApiTags('direcciones')
@Controller('direcciones')
export class DireccionesCiudadanosController {
  constructor(private readonly DireccionesCiudadanosService: DireccionesCiudadanosService) { }

  @Post()
  @ApiOperation({})
  @ApiResponse({
    status: 201,
    type: ResponseDireccionCiudadanoDto
  })
  create(@Body() data: CreateDireccionesCiudadanoDto): Promise<ResponseDireccionCiudadanoDto> {
    return this.DireccionesCiudadanosService.create(data);
  }

  @Get()
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseDireccionCiudadanoDto
  })
  findAll(@Query() query: FindDireccionCiudadanoQueryDto): Promise<ResponseDireccionCiudadanoDto[]> {
    return this.DireccionesCiudadanosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseDireccionCiudadanoDto
  })
  findOne(@Param('id') id: string): Promise<ResponseDireccionCiudadanoDto> {
    return this.DireccionesCiudadanosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseDireccionCiudadanoDto
  })
  async update(@Param('id') id: string, @Body() data: UpdateDireccionesCiudadanoDto): Promise<ResponseDireccionCiudadanoDto> {
    return await this.DireccionesCiudadanosService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseDireccionCiudadanoDto
  })
  async remove(@Param('id') id: string): Promise<ResponseDireccionCiudadanoDto> {
    return await this.DireccionesCiudadanosService.remove(+id);
  }
}
