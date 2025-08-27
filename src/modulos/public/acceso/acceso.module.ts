import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccesoService } from './acceso.service';
import { AccesoController } from './acceso.controller';
import { Acceso } from 'src/modelos/acceso/acceso.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Acceso]) // ✅ Esto ahora funcionará
  ],
  providers: [AccesoService],
  controllers: [AccesoController],
  exports: [AccesoService],
})
export class AccesoModule {}