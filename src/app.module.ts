import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConexionModule } from './config/conexion/conexion.module';
import { PublicModule } from './modulos/public/public.module';
import { PrivadoModule } from './modulos/privado/privado.module';
import { Seguiridad } from './middlewar/seguridad/seguridad';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConexionModule, // Primero: conexión
    PublicModule,   // Segundo: rutas públicas
    PrivadoModule,  // Tercero: rutas privadas
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplica el middleware a todas las rutas que comiencen con /privado
    consumer
      .apply(Seguiridad)
      .forRoutes({ path: 'privado/*', method: RequestMethod.ALL });
  }
}
