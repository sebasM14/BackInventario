
import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CompraService } from './compra.service';
import { Compra } from 'src/modelos/compras/compras.entity';

@Controller() 
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  /**
   * @api {get} /privado/compras/todos Obtener todas las compras
   * @apiName ObtenerCompras
   * @apiGroup Compras
   *
   * @apiSuccess {Object[]} compras Lista de compras
   * @apiSuccess {Number} compras.codCompra ID de la compra
   * @apiSuccess {Number} compras.codUsuario ID del usuario que realizó la compra
   * @apiSuccess {Date} compras.fechaCompra Fecha de la compra
   * @apiSuccess {Number} compras.total Total de la compra
   */
  @Get('todos')
  obtenerTodos() {
    return this.compraService.consultar();
  }

  /**
   * @api {get} /privado/compras/one/:codCompra Obtener una compra por ID
   * @apiName ObtenerCompra
   * @apiGroup Compras
   *
   * @apiParam {Number} codCompra ID de la compra
   *
   * @apiSuccess {Number} codCompra ID de la compra
   * @apiSuccess {Number} codUsuario ID del usuario que realizó la compra
   * @apiSuccess {Date} fechaCompra Fecha de la compra
   * @apiSuccess {Number} total Total de la compra
   */
  @Get('one/:codCompra')
  consultarUno(@Param('codCompra') codCompra: string) {
    const id = Number(codCompra);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.compraService.consultarUno(id);
  }

  /**
   * @api {post} /privado/compras/add Registrar nueva compra
   * @apiName RegistrarCompra
   * @apiGroup Compras
   *
   * @apiBody {Number} codUsuario ID del usuario
   * @apiBody {Date} fechaCompra Fecha de la compra
   * @apiBody {Number} total Total de la compra
   *
   * @apiSuccess {Object} compra Compra registrada
   */
  @Post('add')
  registrar(@Body() objCompra: Compra) {
    return this.compraService.registrar(objCompra);
  }

  /**
   * @api {put} /privado/compras/update/:codCompra Actualizar compra
   * @apiName ActualizarCompra
   * @apiGroup Compras
   *
   * @apiParam {Number} codCompra ID de la compra
   * @apiBody {Number} codUsuario ID del usuario
   * @apiBody {Date} fechaCompra Fecha de la compra
   * @apiBody {Number} total Total de la compra
   *
   * @apiSuccess {Object} mensaje Confirmación de actualización
   */
  @Put('update/:codCompra')
  actualizar(@Body() objCompra: Compra, @Param('codCompra') codCompra: string) {
    const id = Number(codCompra);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.compraService.actualizar(objCompra, id);
  }

  /**
   * @api {delete} /privado/compras/delete/:codCompra Eliminar compra
   * @apiName EliminarCompra
   * @apiGroup Compras
   *
   * @apiParam {Number} codCompra ID de la compra
   *
   * @apiSuccess {Object} mensaje Confirmación de eliminación
   */
  @Delete('delete/:codCompra')
  eliminar(@Param('codCompra') codCompra: string) {
    const id = Number(codCompra);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.compraService.eliminar(id);
  }
}
