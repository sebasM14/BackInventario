import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConexionModule } from './config/conexion/conexion.module';
import { ConfigModule } from '@nestjs/config';
import { AccesoModule } from './modulos/public/acceso/acceso.module';
import { RegistroModule } from './modulos/public/registro/registro.module';
import { Seguridad } from './middlewar/seguridad/seguridad';
import { RoleModule } from './modulos/privado/role/role.module';

@Module({
   imports: [ConfigModule.forRoot({isGlobal: true,envFilePath:".env"}), ConexionModule, AccesoModule, RegistroModule, RoleModule ],
  controllers: [AppController ],
  providers: [AppService, Seguridad],
})
export class AppModule {}
