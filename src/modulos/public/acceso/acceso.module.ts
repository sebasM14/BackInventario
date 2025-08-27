import { Module } from '@nestjs/common';
import { AccesoService } from './acceso.service';
import { AccesoController } from './acceso.controller';

@Module({
  providers: [AccesoService],
  controllers: [AccesoController]
})
export class AccesoModule {}
