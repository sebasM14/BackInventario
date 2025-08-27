import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class Seguiridad implements NestMiddleware{
    use(req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ mensaje: 'Petición negada: token requerido' });
    }

    try {
      // Manejo del formato "Bearer <token>"
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

      if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
      }

      // Verifica el token
      const datosSesion = verify(token, process.env.JWT_SECRET || 'laClaveSecreta') as JwtPayload;

      // funcion para Guardar los datos del usuario en req.user (estándar en Express)
      req.user = datosSesion;

      next();
    } catch (error) {
      console.error('Error al verificar token:', error.message);
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
  }
}