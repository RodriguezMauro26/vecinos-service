/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CreateCiudadanoDto } from './dto/create_ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update_ciudadano.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCiudadanoDto } from './dto/response_ciudadano.dto';
import { FindCiudadanoQueryDto } from './dto/find_ciudadano_query.dto';

@ApiTags('ciudadanos')
@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) { }

  @Post()
  @ApiOperation({})
  @ApiResponse({
    status: 201,
    type: ResponseCiudadanoDto
  })
  create(@Body() data: CreateCiudadanoDto): Promise<ResponseCiudadanoDto> {
    return this.ciudadanosService.create(data);
  }

  @Get()
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseCiudadanoDto
  })
  findAll(@Query() query: FindCiudadanoQueryDto): Promise<ResponseCiudadanoDto[]> {
    return this.ciudadanosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseCiudadanoDto
  })
  findOne(@Param('id') id: string): Promise<ResponseCiudadanoDto> {
    return this.ciudadanosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseCiudadanoDto
  })
  update(@Param('id') id: string, @Body() data: UpdateCiudadanoDto): Promise<ResponseCiudadanoDto> {
    return this.ciudadanosService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: ResponseCiudadanoDto
  })
  remove(@Param('id') id: string): Promise<ResponseCiudadanoDto> {
    return this.ciudadanosService.remove(+id);
  }
}
