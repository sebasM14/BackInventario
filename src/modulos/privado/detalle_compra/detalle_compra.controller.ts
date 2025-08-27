
import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { DetalleCompraService } from './detalle_compra.service';
import { DetalleCompra } from 'src/modelos/detalle_compra/detalle_compra.entity';

@Controller()
export class DetalleCompraController {
  constructor(private readonly detalleService: DetalleCompraService) {}

  /**
   * @api {get} /privado/detalle-compras/todos Obtener todos los detalles de compras
   * @apiName ObtenerDetallesCompra
   * @apiGroup DetalleCompra
   *
   * @apiSuccess {Object[]} detalles Lista de detalles de compra
   * @apiSuccess {Number} detalles.codDetalle ID del detalle
   * @apiSuccess {Number} detalles.codCompra ID de la compra
   * @apiSuccess {Number} detalles.codProducto ID del producto
   * @apiSuccess {Number} detalles.cantidad Cantidad del producto
   * @apiSuccess {Number} detalles.precioUnitario Precio unitario
   * @apiSuccess {Number} detalles.subtotal Subtotal
   */
  @Get('todos')
  obtenerTodos() {
    return this.detalleService.consultar();
  }

  /**
   * @api {get} /privado/detalle-compras/one/:codDetalle Obtener detalle por ID
   * @apiName ObtenerDetalle
   * @apiGroup DetalleCompra
   *
   * @apiParam {Number} codDetalle ID del detalle
   *
   * @apiSuccess {Number} codDetalle ID del detalle
   * @apiSuccess {Number} codCompra ID de la compra
   * @apiSuccess {Number} codProducto ID del producto
   * @apiSuccess {Number} cantidad Cantidad del producto
   * @apiSuccess {Number} precioUnitario Precio unitario
   * @apiSuccess {Number} subtotal Subtotal
   */
  @Get('one/:codDetalle')
  consultarUno(@Param('codDetalle') codDetalle: string) {
    const id = Number(codDetalle);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.detalleService.consultarUno(id);
  }

  /**
   * @api {post} /privado/detalle-compras/add Registrar detalle de compra
   * @apiName RegistrarDetalle
   * @apiGroup DetalleCompra
   *
   * @apiBody {Number} codCompra ID de la compra
   * @apiBody {Number} codProducto ID del producto
   * @apiBody {Number} cantidad Cantidad del producto
   * @apiBody {Number} precioUnitario Precio unitario
   * @apiBody {Number} subtotal Subtotal
   *
   * @apiSuccess {Object} detalle Detalle registrado
   */
  @Post('add')
  registrar(@Body() objDetalle: DetalleCompra) {
    return this.detalleService.registrar(objDetalle);
  }

  /**
   * @api {put} /privado/detalle-compras/update/:codDetalle Actualizar detalle
   * @apiName ActualizarDetalle
   * @apiGroup DetalleCompra
   *
   * @apiParam {Number} codDetalle ID del detalle
   * @apiBody {Number} codCompra ID de la compra
   * @apiBody {Number} codProducto ID del producto
   * @apiBody {Number} cantidad Cantidad del producto
   * @apiBody {Number} precioUnitario Precio unitario
   * @apiBody {Number} subtotal Subtotal
   *
   * @apiSuccess {Object} mensaje Confirmación de actualización
   */
  @Put('update/:codDetalle')
  actualizar(@Body() objDetalle: DetalleCompra, @Param('codDetalle') codDetalle: string) {
    const id = Number(codDetalle);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.detalleService.actualizar(objDetalle, id);
  }

  /**
   * @api {delete} /privado/detalle-compras/delete/:codDetalle Eliminar detalle
   * @apiName EliminarDetalle
   * @apiGroup DetalleCompra
   *
   * @apiParam {Number} codDetalle ID del detalle
   *
   * @apiSuccess {Object} mensaje Confirmación de eliminación
   */
  @Delete('delete/:codDetalle')
  eliminar(@Param('codDetalle') codDetalle: string) {
    const id = Number(codDetalle);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.detalleService.eliminar(id);
  }
}
