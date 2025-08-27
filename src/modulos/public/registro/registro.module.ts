import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { Usuario } from 'src/modelos/usuario/usuario.entity';
import { Acceso } from 'src/modelos/acceso/acceso.entity';

@Module({
  imports: [SequelizeModule.forFeature([Usuario, Acceso])],
  providers: [RegistroService],
  controllers: [RegistroController],
  exports: [RegistroService],
})
export class RegistroModule {}