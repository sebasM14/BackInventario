// src/modulos/privado/detalle_compra/detalle_compra.module.ts
import { Module } from '@nestjs/common';
import { DetalleCompraService } from './detalle_compra.service';
import { DetalleCompraController } from './detalle_compra.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DetalleCompra } from 'src/modelos/detalle_compra/detalle_compra.entity';

@Module({
  imports: [SequelizeModule.forFeature([DetalleCompra])],
  providers: [DetalleCompraService],
  controllers: [DetalleCompraController],
})
export class DetalleCompraModule {}
