/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DireccionesCiudadanosService } from './direcciones_ciudadanos.service';
import { DireccionesCiudadanosController } from './direcciones_ciudadanos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DireccionesCiudadanosController],
  providers: [DireccionesCiudadanosService],
})
export class DireccionesCiudadanosModule { }
