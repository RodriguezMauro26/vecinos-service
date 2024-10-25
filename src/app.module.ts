/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';
import { DireccionesCiudadanosModule } from './direcciones_ciudadanos/direcciones_ciudadanos.module';

@Module({
  imports: [CiudadanosModule, DireccionesCiudadanosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
