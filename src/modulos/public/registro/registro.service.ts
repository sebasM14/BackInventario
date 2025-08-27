import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ACCESO_SQL } from './register_sql';
import GenerarToken from 'src/utilities/shared/generarToken';
import { Usuario } from 'src/modelos/usuario/usuario.entity';
import { Acceso } from 'src/modelos/acceso/acceso.entity';

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel(Usuario) private usuarioRepositorio: typeof Usuario,
    @InjectModel(Acceso) private accesoRepositorio: typeof Acceso,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}
// registro.service.ts
public async nuevoUsuario(objAcceso: Acceso, objUsuario: Usuario): Promise<any> {
  try {
    console.log('Verificando usuario:', objAcceso.nombreAcceso);
    
    const usuarioExiste = await this.accesoRepositorio.findOne({
      where: { nombreAcceso: objAcceso.nombreAcceso },
    });

    if (usuarioExiste) {
      throw new HttpException(
        'El nombre de usuario ya está registrado',
        HttpStatus.CONFLICT,
      );
    }

    // Guardar usuario
    const nuevoUsuario = await this.usuarioRepositorio.create(objUsuario as any);
    const codigoUsuario = nuevoUsuario.codUsuario;

    console.log('Código de usuario generado:', codigoUsuario);

    if (!codigoUsuario) {
      throw new HttpException(
        'Error al guardar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Guardar acceso con clave cifrada
    const claveCifrada = hashSync(objAcceso.claveAcceso);
    await this.accesoRepositorio.create({
      codUsuario: codigoUsuario,
      nombreAcceso: objAcceso.nombreAcceso,
      claveAcceso: claveCifrada
    } as any);

    // ✅ SOLUCIÓN: Usar la misma sintaxis que funciona en AccesoService
    // Obtener datos de sesión con query nativa - USANDO BIND
    console.log('Ejecutando query con codUsuario:', codigoUsuario);
    
    const [datosSesion] = await this.sequelize.query(
      `SELECT u.cod_usuario, u.nombre_usuario, u.telefono_usuario, 
      (SELECT nombre_rol FROM roles WHERE cod_rol = u.cod_rol) AS nombre_rol, 
      a.nombre_acceso 
      FROM accesos a 
      INNER JOIN usuarios u ON u.cod_usuario = a.cod_usuario 
      WHERE a.cod_usuario = $1`,
      { 
        bind: [codigoUsuario], // ✅ Usar BIND como en AccesoService
        raw: true 
      }
    );

    console.log('Datos de sesión obtenidos:', datosSesion);

    if (!datosSesion || (datosSesion as any[]).length === 0) {
      throw new HttpException(
        'No se encontraron datos de sesión para el usuario',
        HttpStatus.NOT_FOUND,
      );
    }

    // Generar token
    const token = GenerarToken.procesarRespuesta((datosSesion as any[])[0]);

    if (token) {
      return { tokenApp: token };
    } else {
      throw new HttpException(
        'Error al generar el token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  } catch (error) {
    console.error('Error completo en el registro:', error);
    throw new HttpException(
      'Error al registrar el usuario: ' + error.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
}