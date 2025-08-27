import { Body, Controller, Post } from '@nestjs/common';
import { AccesoService } from './acceso.service';
import { Acceso } from 'src/modelos/acceso/acceso.entity';

@Controller('acceso')
export class AccesoController {
  constructor(private readonly accesoService: AccesoService) {}

  @Post('/signin')
  public async inicioSesion(@Body() objAcceso: Acceso): Promise<any> {
    return this.accesoService.sesion(objAcceso);
  }
}