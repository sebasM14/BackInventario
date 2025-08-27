import { compareSync } from 'bcryptjs';
import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Acceso } from 'src/modelos/acceso/acceso.entity';
import GenerarToken from 'src/utilities/shared/generarToken';
import { ACCESO_SQL } from '../registro/register_sql';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AccesoService {
  constructor(
    @InjectModel(Acceso)
    private readonly accesoRepository: typeof Acceso,

    @Inject('SEQUELIZE') 
    private readonly sequelize: Sequelize,
  ) {}
// acceso.service.ts
public async sesion(objAcceso: Acceso): Promise<any> {
  const usuarioExiste = await this.accesoRepository.findOne({
    where: { nombreAcceso: objAcceso.nombreAcceso },
    raw: true
  });

  if (usuarioExiste) {
    const claveAcceso = usuarioExiste.claveAcceso;

    console.log('Clave de la base de datos:', claveAcceso);
    console.log('Clave ingresada:', objAcceso.claveAcceso);

    if (compareSync(objAcceso.claveAcceso, claveAcceso)) {
      try {
        
        const [datosSesion] = await this.sequelize.query(
          ACCESO_SQL.DATOS_SESION,
          { 
            bind: [usuarioExiste.codUsuario], 
            raw: true 
          }
        );

        console.log('Datos de sesión:', datosSesion);

        const tokenSistema = GenerarToken.procesarRespuesta(datosSesion[0]);
        if (tokenSistema) {
          return { tokenApp: tokenSistema };
        } else {
          throw new HttpException(
            'Fallo al generar la autenticación',
            HttpStatus.CONFLICT,
          );
        }
      } catch (miError) {
        console.error('Error en la consulta SQL:', miError);
        throw new HttpException(
          'Fallo al consultar la información',
          HttpStatus.CONFLICT,
        );
      }
    } else {
      throw new HttpException('Las claves no coinciden', HttpStatus.UNAUTHORIZED);
    }
  } else {
    throw new HttpException('Usuario no registrado', HttpStatus.BAD_REQUEST);
  }
}
}