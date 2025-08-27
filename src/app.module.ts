import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConexionModule } from './config/conexion/conexion.module';
import { ConfigModule } from '@nestjs/config';
import { PublicModule } from './modulos/public/public.module';
import { PrivadoModule } from './modulos/privado/privado.module';
import { Seguiridad } from './middlewar/seguridad/seguridad';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    ConexionModule, // ✅ PRIMERO: Módulo de conexión
    PublicModule,    // ✅ SEGUNDO: Módulos que dependen de la conexión
    PrivadoModule    // ✅ TERCERO: Otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(Seguiridad).forRoutes({ path: '/privado/*', method: RequestMethod.ALL });
  }
}