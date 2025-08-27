import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DetalleCompra } from 'src/modelos/detalle_compra/detalle_compra.entity';

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
}
