// src/modulos/privado/compra/compra.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CompraService } from './compra.service';
import { Compra } from 'src/modelos/compras/compras.entity';

@Controller() 
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get('todos')
  obtenerTodos() {
    return this.compraService.consultar();
  }

  @Get('one/:codCompra')
  consultarUno(@Param('codCompra') codCompra: string) {
    const id = Number(codCompra);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.compraService.consultarUno(id);
  }

  @Post('add')
  registrar(@Body() objCompra: Compra   ) {
    return this.compraService.registrar(objCompra);
  }

  @Put('update/:codCompra')
  actualizar(@Body() objCompra: Compra, @Param('codCompra') codCompra: string) {
    const id = Number(codCompra);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.compraService.actualizar(objCompra, id);
  }

  @Delete('delete/:codCompra')
  eliminar(@Param('codCompra') codCompra: string) {
    const id = Number(codCompra);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.compraService.eliminar(id);
  }
}
