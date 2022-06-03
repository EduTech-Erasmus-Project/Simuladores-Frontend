import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { NuevoEjercitarioComponent } from "./pages/ejercitario/nuevo-ejercitario.component";

import { DatosAdminComponent } from "./pages/datos-admin/datos-admin.component";
import { ExpertosComponent } from "./pages/expertos/expertos.component";
import { HomeComponent } from "./pages/home/home.component";
import { SimuladoresComponent } from "./pages/simuladores/simuladores.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";




const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "expertos", component: ExpertosComponent },
      { path: "simuladores", component: SimuladoresComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "mi-cuenta", component: DatosAdminComponent },
      { path: "nuevo-ejercitario", component: NuevoEjercitarioComponent }
    ],
  },
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
