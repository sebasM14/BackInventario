import { Body, Controller, Post } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { Acceso } from 'src/modelos/acceso/acceso.entity';
import { Usuario } from 'src/modelos/usuario/usuario.entity';

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post('/user')
  public registrarUsuario(@Body() datosRegistro: any): any {
    const objAcceso: Acceso = datosRegistro;
    const objUsuario: Usuario = datosRegistro;

    return this.registroService.nuevoUsuario(objAcceso, objUsuario);
  }
}
