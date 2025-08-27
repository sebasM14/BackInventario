import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { DetalleCompraService } from './detalle_compra.service';
import { DetalleCompra } from 'src/modelos/detalle_compra/detalle_compra.entity';

@Controller()
export class DetalleCompraController {
  constructor(private readonly detalleService: DetalleCompraService) {}

  // GET /privado/detalle-compras/todos
  @Get('todos')
  obtenerTodos() {
    return this.detalleService.consultar();
  }

  // GET /privado/detalle-compras/one/:codDetalle
  @Get('one/:codDetalle')
  consultarUno(@Param('codDetalle') codDetalle: string) {
    const id = Number(codDetalle);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.detalleService.consultarUno(id);
  }

  // POST /privado/detalle-compras/add
  @Post('add')
  registrar(@Body() objDetalle: DetalleCompra) {
    return this.detalleService.registrar(objDetalle);
  }

  // PUT /privado/detalle-compras/update/:codDetalle
  @Put('update/:codDetalle')
  actualizar(@Body() objDetalle: DetalleCompra, @Param('codDetalle') codDetalle: string) {
    const id = Number(codDetalle);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.detalleService.actualizar(objDetalle, id);
  }

  // DELETE /privado/detalle-compras/delete/:codDetalle
  @Delete('delete/:codDetalle')
  eliminar(@Param('codDetalle') codDetalle: string) {
    const id = Number(codDetalle);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.detalleService.eliminar(id);
  }
}
