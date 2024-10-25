/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDireccionesCiudadanoDto } from './dto/create_direcciones_ciudadano.dto';
import { UpdateDireccionesCiudadanoDto } from './dto/update_direcciones_ciudadano.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDireccionCiudadanoDto } from './dto/response_direccion_ciudadano.dto';
import { FindDireccionCiudadanoQueryDto } from './dto/find_direccion_ciudadano_query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DireccionesCiudadanosService {
  constructor(private prisma: PrismaService) { }

  async create(createDireccionDto: CreateDireccionesCiudadanoDto): Promise<ResponseDireccionCiudadanoDto> {
    const { ciudadanos_id, ...data } = createDireccionDto;

    return this.prisma.direcciones_ciudadanos.create({
      data: {
        ...data,
        rel_ciudadanos_direcciones: ciudadanos_id ? {
          create: ciudadanos_id.map((ciudadanoId) => ({
            ciudadano_id: ciudadanoId,
          })),
        }
          : undefined,
      },
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            ciudadanos: true, // Incluir ciudadanos al crear dirección
          }
        }
      }
    })
  }

  async findAll(query: FindDireccionCiudadanoQueryDto): Promise<ResponseDireccionCiudadanoDto[]> {
    const { take, skip, orderBy, order, filterBy, filter } = query;
    const findOptions: Prisma.direcciones_ciudadanosFindManyArgs = {};

    if (take !== undefined) {
      findOptions.take = Number(take);
    }

    if (skip !== undefined) {
      findOptions.skip = Number(skip);
    }

    if (orderBy && order) {
      findOptions.orderBy = {
        [orderBy]: order,
      };
    }

    if (filterBy && filter) {
      findOptions.where = {
        [filterBy]: {
          contains: filter,
          mode: 'insensitive',
        },
      };
    }
    return this.prisma.direcciones_ciudadanos.findMany({
      ...findOptions,
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            ciudadanos: true,
          },
        },
      }
    })
  }

  async findOne(id: number): Promise<ResponseDireccionCiudadanoDto | null> {
    return this.prisma.direcciones_ciudadanos.findUnique({
      where: { direccion_ciudadano_id: id },
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            ciudadanos: true,  // Asegúrate de incluir esta relación si 'ciudadanos' es requerido en tu DTO.
          },
        },
      }
    })
  }

  async update(id: number, data: UpdateDireccionesCiudadanoDto): Promise<ResponseDireccionCiudadanoDto> {
    const { ciudadanos_id, ...direccionData } = data;
    return this.prisma.$transaction(async (prisma) => {
      const updatedDireccion = await prisma.direcciones_ciudadanos.update({
        where: { direccion_ciudadano_id: id },
        data: direccionData,
        include: {
          rel_ciudadanos_direcciones: {
            include: {
              ciudadanos: true,
            }
          }
        },
      });
      if (ciudadanos_id) {
        await prisma.rel_ciudadanos_direcciones.deleteMany({
          where: { direccion_ciudadano_id: id },
        });
        await prisma.rel_ciudadanos_direcciones.createMany({
          data: ciudadanos_id.map(ciudadanoId => ({
            ciudadano_id: ciudadanoId,
            direccion_ciudadano_id: id,
          })),
        });
      }
      return updatedDireccion;
    });
  }


  async remove(id: number): Promise<ResponseDireccionCiudadanoDto> {
    return this.prisma.direcciones_ciudadanos.delete({
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            ciudadanos: false,  // Asegúrate de incluir esta relación si 'ciudadanos' es requerido en tu DTO.
          }
        }
      },
      where: { direccion_ciudadano_id: id },
    })
  }
}
