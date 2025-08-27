// src/modulos/privado/producto/producto.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from 'src/modelos/productos/producto.entity';

@Controller() 
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // GET /privado/productos/todos
  @Get('todos')
  obtenerTodos() {
    return this.productoService.consultar();
  }

  // POST /privado/productos/add
  @Post('add')
  registrarProducto(@Body() objProducto: Producto) {
    return this.productoService.registrar(objProducto);
  }

  // GET /privado/productos/one/:codProducto
  @Get('one/:codProducto')
  consultarUno(@Param('codProducto') codProducto: string) {
    const id = Number(codProducto);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.productoService.consultarUno(id);
  }

  // PUT /privado/productos/update/:codProducto
  @Put('update/:codProducto')
  actualizarProducto(@Body() objProducto: Producto, @Param('codProducto') codProducto: string) {
    const id = Number(codProducto);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.productoService.actualizar(objProducto, id);
  }

  // DELETE /privado/productos/delete/:codProducto
  @Delete('delete/:codProducto')
  eliminarProducto(@Param('codProducto') codProducto: string) {
    const id = Number(codProducto);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.productoService.eliminar(id);
  }
}
