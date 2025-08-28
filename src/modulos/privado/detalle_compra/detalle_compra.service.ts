import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Compra } from 'src/modelos/compras/compras.entity';
import { DetalleCompra } from 'src/modelos/detalle_compra/detalle_compra.entity';
import { Producto } from 'src/modelos/productos/producto.entity';
import { Usuario } from 'src/modelos/usuario/usuario.entity';

@Injectable()
export class DetalleCompraService {
  constructor(
    @InjectModel(DetalleCompra)
    private readonly detalleRepositorio: typeof DetalleCompra,
  ) {}

  // Consultar todos los detalles
  public async consultar(): Promise<DetalleCompra[]> {
    try {
      return await this.detalleRepositorio.findAll({ include: ['compra', 'producto'] });
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al consultar detalles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Consultar un detalle por ID
  public async consultarUno(codDetalle: number): Promise<DetalleCompra> {
    try {
      const detalle = await this.detalleRepositorio.findByPk(codDetalle, { include: ['compra', 'producto'] });
      if (!detalle) throw new HttpException('Detalle no encontrado', HttpStatus.NOT_FOUND);
      return detalle;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al consultar detalle', HttpStatus.BAD_REQUEST);
    }
  }

  // Registrar un detalle
  public async registrar(objDetalle: DetalleCompra): Promise<any> {
    try {
      return await this.detalleRepositorio.create({ ...objDetalle });
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al registrar detalle', HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un detalle
  public async actualizar(objDetalle: DetalleCompra, codDetalle: number): Promise<any> {
    try {
      const detalle = await this.detalleRepositorio.findByPk(codDetalle);
      if (!detalle) throw new HttpException('Detalle no encontrado', HttpStatus.NOT_FOUND);
      await this.detalleRepositorio.update({ ...objDetalle }, { where: { codDetalle } });
      return { mensaje: 'Detalle actualizado correctamente' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al actualizar detalle', HttpStatus.BAD_REQUEST);
    }
  }

  // Eliminar un detalle
  public async eliminar(codDetalle: number): Promise<any> {
    try {
      const eliminado = await this.detalleRepositorio.destroy({ where: { codDetalle } });
      if (!eliminado) throw new HttpException('Detalle no encontrado', HttpStatus.NOT_FOUND);
      return { mensaje: 'Detalle eliminado correctamente' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al eliminar detalle', HttpStatus.BAD_REQUEST);
    }
  }

  
  // Generar factura completa de una compra
  public async generarFactura(codCompra: number): Promise<any> {
    try {
      const detalles = await this.detalleRepositorio.findAll({
        where: { codCompra },
        include: [
          {
            model: Compra,
            as: 'compra',
            include: [{ model: Usuario, as: 'usuario', attributes: ['codUsuario', 'nombreUsuario'] }],
          },
          { model: Producto, as: 'producto', attributes: ['codProducto', 'nombreProducto', 'precio'] },
        ],
      });

      if (!detalles || detalles.length === 0) {
        throw new HttpException('Compra no encontrada o sin detalles', HttpStatus.NOT_FOUND);
      }

      const compra = detalles[0].compra;
      const usuario = compra.usuario;

      // Armamos la factura
      const factura = {
        factura: {
          codCompra: compra.codCompra,
          fechaCompra: compra.fechaCompra,
          cliente: {
            codUsuario: usuario.codUsuario,
            nombre: usuario.nombreUsuario,
          },
          productos: detalles.map((d) => ({
            codProducto: d.producto.codProducto,
            nombreProducto: d.producto.nombreProducto,
            cantidad: d.cantidad,
            precioUnitario: d.precioUnitario,
            subtotal: d.subtotal,
          })),
          total: compra.totalCompra,
        },
      };

      return factura;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al generar factura', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
