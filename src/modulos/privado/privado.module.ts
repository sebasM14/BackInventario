import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";

import e from "express";
import { Role } from "src/modelos/rol/rol.entity";
import { RoleModule } from "./role/role.module";
import { Productos } from "src/modelos/productos/producto.entity";
import { ProductoModule } from "./producto/producto.module";




const routes: Routes = [
    {
        path: 'privado',
        children:[Role,Productos]
    }
];

@Module({
    imports: [ProductoModule,RouterModule.register(routes),RoleModule],
    exports: [RouterModule],
    })
export class PrivadoModule {}