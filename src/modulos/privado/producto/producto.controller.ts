// src/modulos/privado/producto/producto.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from 'src/modelos/productos/producto.entity';

@Controller() // Se usa el path desde RouterModule (/privado/productos)
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  /**
   * @api {get} /privado/productos/todos Obtener todos los productos
   * @apiName ObtenerProductos
   * @apiGroup Productos
   *
   * @apiSuccess {Object[]} productos Lista de productos.
   * @apiSuccess {Number} productos.codProducto ID del producto.
   * @apiSuccess {String} productos.numeroLote Número de lote.
   * @apiSuccess {String} productos.nombreProducto Nombre del producto.
   * @apiSuccess {Number} productos.precio Precio del producto.
   * @apiSuccess {Number} productos.cantidadDisponible Cantidad disponible.
   */
  @Get('todos')
  obtenerTodos() {
    return this.productoService.consultar();
  }

  /**
   * @api {post} /privado/productos/add Registrar un producto
   * @apiName RegistrarProducto
   * @apiGroup Productos
   *
   * @apiParam {String} numeroLote Número de lote.
   * @apiParam {String} nombreProducto Nombre del producto.
   * @apiParam {Number} precio Precio del producto.
   * @apiParam {Number} cantidadDisponible Cantidad disponible.
   *
   * @apiSuccess {Number} codProducto ID del producto registrado.
   * @apiSuccess {String} numeroLote Número de lote.
   * @apiSuccess {String} nombreProducto Nombre del producto.
   * @apiSuccess {Number} precio Precio del producto.
   * @apiSuccess {Number} cantidadDisponible Cantidad disponible.
   */
  @Post('add')
  registrarProducto(@Body() objProducto: Producto) {
    return this.productoService.registrar(objProducto);
  }

  /**
   * @api {get} /privado/productos/one/:codProducto Consultar un producto por ID
   * @apiName ConsultarProducto
   * @apiGroup Productos
   *
   * @apiParam {Number} codProducto ID del producto a consultar.
   *
   * @apiSuccess {Number} codProducto ID del producto.
   * @apiSuccess {String} numeroLote Número de lote.
   * @apiSuccess {String} nombreProducto Nombre del producto.
   * @apiSuccess {Number} precio Precio del producto.
   * @apiSuccess {Number} cantidadDisponible Cantidad disponible.
   */
  @Get('one/:codProducto')
  consultarUno(@Param('codProducto') codProducto: string) {
    const id = Number(codProducto);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.productoService.consultarUno(id);
  }

  /**
   * @api {put} /privado/productos/update/:codProducto Actualizar un producto
   * @apiName ActualizarProducto
   * @apiGroup Productos
   *
   * @apiParam {Number} codProducto ID del producto a actualizar.
   * @apiParam {String} numeroLote Número de lote.
   * @apiParam {String} nombreProducto Nombre del producto.
   * @apiParam {Number} precio Precio del producto.
   * @apiParam {Number} cantidadDisponible Cantidad disponible.
   *
   * @apiSuccess {String} mensaje Confirmación de actualización.
   */
  @Put('update/:codProducto')
  actualizarProducto(@Body() objProducto: Producto, @Param('codProducto') codProducto: string) {
    const id = Number(codProducto);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.productoService.actualizar(objProducto, id);
  }

  /**
   * @api {delete} /privado/productos/delete/:codProducto Eliminar un producto
   * @apiName EliminarProducto
   * @apiGroup Productos
   *
   * @apiParam {Number} codProducto ID del producto a eliminar.
   *
   * @apiSuccess {String} mensaje Mensaje de eliminación.
   */
  @Delete('delete/:codProducto')
  eliminarProducto(@Param('codProducto') codProducto: string) {
    const id = Number(codProducto);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.productoService.eliminar(id);
  }
}
