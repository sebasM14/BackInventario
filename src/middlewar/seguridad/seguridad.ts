import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class Seguiridad implements NestMiddleware {
  use(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      console.warn('[Seguridad] ❌ Petición sin token');
      return res.status(401).json({ mensaje: 'Petición negada: token requerido' });
    }

    try {
      // Manejo del formato "Bearer <token>"
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

      if (!token) {
        console.warn('[Seguridad] ⚠️ Token no proporcionado');
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
      }

      // Verifica el token
      const datosSesion = verify(
        token,
        process.env.JWT_SECRET || 'laClaveSecreta',
      ) as JwtPayload;

      // Guardar los datos del usuario en req.user (estándar en Express)
      req.user = datosSesion;

     
      console.log('🔐 Token recibido:', token);
      console.log('👤 Datos de sesión ->', {
        codigo: datosSesion['codUsuario'] || datosSesion['id'],
        nombre: datosSesion['nombre'] || datosSesion['username'],
        rol: datosSesion['rol'] || 'No especificado',
      });

      next();
    } catch (error: any) {
      console.error('[Seguridad] ❌ Error al verificar token:', error.message);
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
  }
}
