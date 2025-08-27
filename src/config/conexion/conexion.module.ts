import { Global, Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Usuario } from 'src/modelos/usuario/usuario.entity';
import { Productos } from 'src/modelos/productos/producto.entity';
import { Role } from 'src/modelos/rol/rol.entity';
import { Acceso } from 'src/modelos/acceso/acceso.entity';

@Global()
@Module({
  providers: [
    {
      provide: 'SEQUELIZE',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const sequelize = new Sequelize({
            dialect: 'postgres', 
            host: String(process.env.HOST),
            port: Number(process.env.PORT),
            username: String(process.env.USER),
            password: String(process.env.CLAVE),
            database: String(process.env.BASE_DATOS),
            logging: true,
          });

          
          sequelize.addModels([Usuario,Acceso,Role,Productos
            //modelos
          ]);

          await sequelize.authenticate();
          console.log(
            '✅ Conexión a la base de datos exitosa: ' +
              String(process.env.BASE_DATOS),
          );

          await sequelize.sync(); // sincroniza tablas ( en desarrollo)

          return sequelize;
        } catch (miError) {
          console.error('❌Falló al realizar la conexión', miError);
          throw miError;
        }
      },
    },
  ],
  exports: ['SEQUELIZE'],
})
export class ConexionModule {}
