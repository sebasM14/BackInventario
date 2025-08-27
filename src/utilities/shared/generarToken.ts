import { sign } from 'jsonwebtoken';

class GenerarToken {
  public static procesarRespuesta(datosSesion: any): string {
    // Verificar que los datos de sesión estén presentes
    if (!datosSesion || !datosSesion.cod_usuario) {
      throw new Error('Datos de sesión no proporcionados');
    }

    // Generar el token
    const token = sign(
      {
        id: datosSesion.cod_usuario,
        nombre: datosSesion.nombre_usuario,
        rol: datosSesion.nombre_rol,
        telefono: datosSesion.telefono_usuario,
        access: datosSesion.nombre_acceso,
      },
      process.env.JWT_SECRET || 'laClaveSecreta', // Usar una clave secreta desde variables de entorno
      { expiresIn: '8h' }, // Expiración del token
    );

    return token;
  }
}

export default GenerarToken;