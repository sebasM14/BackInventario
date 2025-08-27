
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { ProductoModule } from './producto/producto.module';
import { RoleModule } from './role/role.module';
import { CompraModule } from './compra/compra.module';
import { DetalleCompraModule } from './detalle_compra/detalle_compra.module';

const routes: Routes = [
  {
    path: 'privado',
    children: [
      { path: 'productos', module: ProductoModule }, 
      { path: 'roles', module: RoleModule },
      { path: 'compras', module: CompraModule },
      { path: 'detalle-compras', module: DetalleCompraModule },
    ],
  },
];

@Module({
  imports: [
    ProductoModule,
    RoleModule,
    CompraModule,
    DetalleCompraModule,
    RouterModule.register(routes),
  ],
})
export class PrivadoModule {}
