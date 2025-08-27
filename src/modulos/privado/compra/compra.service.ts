// src/modulos/privado/compra/compra.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Compra } from 'src/modelos/compras/compras.entity';

@Injectable()
export class CompraService {
  constructor(@InjectModel(Compra) private readonly compraRepositorio: typeof Compra) {}

  public async consultar(): Promise<Compra[]> {
    try {
      return await this.compraRepositorio.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al consultar compras', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async consultarUno(codigo: number): Promise<any> {
    try {
      const compra = await this.compraRepositorio.findByPk(codigo);
      if (!compra) return new HttpException('Compra no encontrada', HttpStatus.NOT_FOUND);
      return compra;
    } catch (error) {
      throw new HttpException('Error al consultar compra', HttpStatus.BAD_REQUEST);
    }
  }

  public async registrar(objCompra: Compra): Promise<any> {
    try {
      return await this.compraRepositorio.create({ ...objCompra });
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al registrar compra', HttpStatus.BAD_REQUEST);
    }
  }

  public async actualizar(objCompra: Compra, codigo: number): Promise<any> {
    try {
      const compra = await this.compraRepositorio.findByPk(codigo);
      if (!compra) return new HttpException('Compra no encontrada', HttpStatus.NOT_FOUND);
      await this.compraRepositorio.update({ ...objCompra }, { where: { codCompra: codigo } });
      return { mensaje: 'Compra actualizada correctamente' };
    } catch (error) {
      throw new HttpException('Error al actualizar compra', HttpStatus.BAD_REQUEST);
    }
  }

  public async eliminar(codigo: number): Promise<any> {
    try {
      const eliminado = await this.compraRepositorio.destroy({ where: { codCompra: codigo } });
      if (!eliminado) return new HttpException('Compra no encontrada', HttpStatus.NOT_FOUND);
      return { mensaje: 'Compra eliminada correctamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar compra', HttpStatus.BAD_REQUEST);
    }
  }
}
