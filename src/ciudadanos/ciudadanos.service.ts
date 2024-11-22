import { Injectable } from '@nestjs/common';
import { CreateCiudadanoDto } from './dto/create_ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update_ciudadano.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseCiudadanoDto } from './dto/response_ciudadano.dto';
import { FindCiudadanoQueryDto } from './dto/find_ciudadano_query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CiudadanosService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCiudadanoDto: CreateCiudadanoDto,
  ): Promise<ResponseCiudadanoDto> {
    const { direcciones_ciudadanos_id, ...data } = createCiudadanoDto;
    return this.prisma.ciudadanos.create({
      data: {
        ...data,
        rel_ciudadanos_direcciones: direcciones_ciudadanos_id
          ? {
              create: direcciones_ciudadanos_id.map(direccionId => ({
                direccion_ciudadano_id: direccionId,
              })),
            }
          : undefined,
      },
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            direcciones_ciudadanos: true, // Incluir direcciones al crear ciudadano
          },
        },
      },
    });
  }

  async findAll(query: FindCiudadanoQueryDto): Promise<ResponseCiudadanoDto[]> {
    const { take, skip, orderBy, order, filterBy, filter } = query;
    const findOptions: Prisma.ciudadanosFindManyArgs = {};

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

    const ciudadanos = await this.prisma.ciudadanos.findMany({
      ...findOptions,
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            direcciones_ciudadanos: true,
          },
        },
      },
    });

    if (ciudadanos.length === 0) {
      return null;
    }
    const resultados = ciudadanos.map(ciudadano => {
      const resultado = {
        ...ciudadano,
        direcciones: ciudadano.rel_ciudadanos_direcciones
          .filter(direccion => 'direcciones_ciudadanos' in direccion)
          .map(direccion => direccion.direcciones_ciudadanos),
      };
      delete resultado.rel_ciudadanos_direcciones;
      return resultado;
    });

    return resultados;
  }

  async findOne(id: number): Promise<ResponseCiudadanoDto | null> {
    const ciudadano = await this.prisma.ciudadanos.findUnique({
      where: { ciudadano_id: id },
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            direcciones_ciudadanos: true,
          },
        },
      },
    });
    if (!ciudadano) {
      return null;
    }

    const resultado = {
      ...ciudadano,
      direcciones: ciudadano.rel_ciudadanos_direcciones.map(
        rel => rel.direcciones_ciudadanos,
      ),
    };
    delete resultado.rel_ciudadanos_direcciones;

    return resultado;
  }

  async update(
    id: number,
    data: UpdateCiudadanoDto,
  ): Promise<ResponseCiudadanoDto> {
    const { direcciones_ciudadanos_id, ...ciudadanoData } = data;
    return this.prisma.$transaction(async prisma => {
      const updatedCiudadano = await prisma.ciudadanos.update({
        where: { ciudadano_id: id },
        data: ciudadanoData,
        include: {
          rel_ciudadanos_direcciones: {
            include: {
              direcciones_ciudadanos: true,
            },
          },
        },
      });
      if (direcciones_ciudadanos_id) {
        await prisma.rel_ciudadanos_direcciones.deleteMany({
          where: { ciudadano_id: id },
        });
        await prisma.rel_ciudadanos_direcciones.createMany({
          data: direcciones_ciudadanos_id.map(direccionId => ({
            ciudadano_id: id,
            direccion_ciudadano_id: direccionId,
          })),
        });
      }
      return updatedCiudadano;
    });
  }

  async remove(id: number): Promise<ResponseCiudadanoDto> {
    return this.prisma.ciudadanos.delete({
      include: {
        rel_ciudadanos_direcciones: {
          include: {
            direcciones_ciudadanos: false,
          },
        },
      },
      where: { ciudadano_id: id },
    });
  }
}
