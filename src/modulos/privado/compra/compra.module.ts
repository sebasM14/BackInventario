// src/modulos/privado/compra/compra.module.ts
import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Compra } from 'src/modelos/compras/compras.entity';

@Module({
  imports: [SequelizeModule.forFeature([Compra])],
  providers: [CompraService],
  controllers: [CompraController],
})
export class CompraModule {}
