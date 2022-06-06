import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActividadComponent } from "./pages/actividad/actividad.component";
import { DatosUsuarioComponent } from "./pages/datos-usuario/datos-usuario.component";
import { PresentacionInicioUserComponent } from "./pages/presentacion-inicio-user/presentacion-inicio-user.component";

import { UserComponent } from "./user.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "", component: PresentacionInicioUserComponent },

      {
        path: "actividad/:id",
        component: ActividadComponent,
      },
      { path: "mi-cuenta", component: DatosUsuarioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
