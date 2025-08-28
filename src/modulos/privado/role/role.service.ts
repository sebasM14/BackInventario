import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/modelos/rol/rol.entity';
import { Usuario } from 'src/modelos/usuario/usuario.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleRepositorio: typeof Role,
  ) {}

  // Consultar todos los roles
  public async consultar(): Promise<Role[]> {
    try {
      return await this.roleRepositorio.findAll({ include: [Usuario] });
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al consultar roles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Verificar si existe un rol por nombre
  public async verificarRol(nombreRol: string): Promise<boolean> {
    const existe = await this.roleRepositorio.findOne({ where: { nombreRol } });
    return !!existe;
  }

  // Registrar un rol
  public async registrar(objRol: Role): Promise<any> {
    try {
      if (await this.verificarRol(objRol.nombreRol)) {
        return new HttpException('El rol ya existe', HttpStatus.BAD_REQUEST);
      }
      return await this.roleRepositorio.create({
        nombreRol: objRol.nombreRol,
        estadoRol: objRol.estadoRol || 1,
      } as any);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al registrar rol', HttpStatus.BAD_REQUEST);
    }
  }

  // Consultar un rol por ID
  public async consultarUno(codigo: number): Promise<any> {
    try {
      const rol = await this.roleRepositorio.findByPk(codigo, { include: [Usuario] });
      if (!rol) return new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
      return rol;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al consultar rol', HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un rol
  public async actualizar(objRol: Role, codigo: number): Promise<any> {
    try {
      const rol = await this.roleRepositorio.findByPk(codigo);
      if (!rol) return new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);

      await this.roleRepositorio.update(
        {
          nombreRol: objRol.nombreRol,
          estadoRol: objRol.estadoRol,
        },
        { where: { codRol: codigo } },
      );

      return { mensaje: 'Rol actualizado correctamente' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al actualizar rol', HttpStatus.BAD_REQUEST);
    }
  }

  // Eliminar un rol
  public async eliminar(codigo: number): Promise<any> {
    try {
      const eliminado = await this.roleRepositorio.destroy({ where: { codRol: codigo } });
      if (!eliminado) return new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
      return { mensaje: 'Rol eliminado correctamente' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al eliminar rol', HttpStatus.BAD_REQUEST);
    }
  }
}
