import { RouterModule, Routes } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AccesoModule } from "./acceso/acceso.module";
import { RegistroModule } from "./registro/registro.module";

const routes: Routes = [
    {
        path: "public",
        children: [
            AccesoModule,
            RegistroModule
        ]
    }
]

@Module({
    imports: [
        RouterModule.register(routes), 
        AccesoModule, 
        RegistroModule
    ],
    exports: [RouterModule],
   
})
export class PublicModule {}