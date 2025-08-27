import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Producto } from 'src/modelos/productos/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto)
    private readonly productoRepositorio: typeof Producto,
  ) {}

  // Consultar todos los productos
  public async consultar(): Promise<Producto[]> {
    try {
      return await this.productoRepositorio.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al consultar productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Verificar si existe un producto por número de lote
  public async verificarProducto(numeroLote: string): Promise<boolean> {
    const existe = await this.productoRepositorio.findOne({ where: { numeroLote } });
    return !!existe;
  }

  // Registrar un producto
  public async registrar(objProducto: Producto): Promise<any> {
    try {
      if (await this.verificarProducto(objProducto.numeroLote)) {
        return new HttpException('El producto ya existe', HttpStatus.BAD_REQUEST);
      } else {
        // 👇 convertir en objeto plano para evitar error de tipos
        return await this.productoRepositorio.create({ ...objProducto });
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al registrar producto', HttpStatus.BAD_REQUEST);
    }
  }

  // Consultar un producto por ID
  public async consultarUno(codigo: number): Promise<any> {
    try {
      const producto = await this.productoRepositorio.findByPk(codigo);
      if (!producto) {
        return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      return producto;
    } catch (error) {
      throw new HttpException('Error al consultar producto', HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un producto
  public async actualizar(objProducto: Producto, codigo: number): Promise<any> {
    try {
      const producto = await this.productoRepositorio.findByPk(codigo);
      if (!producto) {
        return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      await this.productoRepositorio.update({ ...objProducto }, { where: { codProducto: codigo } });
      return { mensaje: 'Producto actualizado correctamente' };
    } catch (error) {
      throw new HttpException('Error al actualizar producto', HttpStatus.BAD_REQUEST);
    }
  }

  // Eliminar un producto
  public async eliminar(codigo: number): Promise<any> {
    try {
      const eliminado = await this.productoRepositorio.destroy({ where: { codProducto: codigo } });
      if (!eliminado) {
        return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      return { mensaje: 'Producto eliminado correctamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar producto', HttpStatus.BAD_REQUEST);
    }
  }
}
