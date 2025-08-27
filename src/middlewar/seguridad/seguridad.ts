import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class Seguiridad implements NestMiddleware{
    
    
    public use(req: Request, res: Response, next: NextFunction)  {
        if(!req.headers.authorization){
            res.status(401).json({respuesta: "Peticion negada por el sistema"});
        }else{

            try {
                const token = req.headers.authorization;
                const datosSesion = verify(token, 'laClaveSecreta')

                
                

 if (req.method != 'PUT') {
                req.body.datosUsuario = datosSesion;
            }
                next();
                
            } catch (error) {
                console.log(error);
                
            res.status(401).json({mensaje:"Intento de fraude"});
            }

        }

    }

}
