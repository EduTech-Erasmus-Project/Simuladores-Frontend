import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatosUsuarioComponent } from "./pages/datos-usuario/datos-usuario.component";
import { MisActividadesUsuarioComponent } from "./pages/mis-actividades-usuario/mis-actividades-usuario.component";
import { PresentacionInicioUserComponent } from "./pages/presentacion-inicio-user/presentacion-inicio-user.component";

import { UserComponent } from "./user.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "home", component: PresentacionInicioUserComponent },
      {
        path: "inicio/:correo",
        component: PresentacionInicioUserComponent,
      },
      {
        path: "Mis-Actividades-Usuario/:correo",
        component: MisActividadesUsuarioComponent,
      },
      { path: "datosUsuario/:correo", component: DatosUsuarioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
