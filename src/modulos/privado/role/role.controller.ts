import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/modelos/rol/rol.entity';

@Controller() // Path desde RouterModule: /privado/roles
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('todos')
  obtenerTodos() {
    return this.roleService.consultar();
  }

  @Post('add')
  registrarRol(@Body() objRol: Role) {
    return this.roleService.registrar(objRol);
  }

  @Get('one/:codRol')
  consultarUno(@Param('codRol') codRol: string) {
    const id = Number(codRol);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.roleService.consultarUno(id);
  }

  @Put('update/:codRol')
  actualizarRol(@Body() objRol: Role, @Param('codRol') codRol: string) {
    const id = Number(codRol);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.roleService.actualizar(objRol, id);
  }

  @Delete('delete/:codRol')
  eliminarRol(@Param('codRol') codRol: string) {
    const id = Number(codRol);
    if (isNaN(id)) throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    return this.roleService.eliminar(id);
  }
}
