import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { NuevoEjercitarioComponent } from "./pages/ejercitario/nuevo-ejercitario.component";

import { DatosAdminComponent } from "./pages/datos-admin/datos-admin.component";
import { ExpertosComponent } from "./pages/expertos/expertos.component";
import { HomeComponent } from "./pages/home/home.component";
import { SimuladoresComponent } from "./pages/simuladores/simuladores.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { CrearPreguntaComponent } from "./components/crear-pregunta/crear-pregunta.component";
import { ListaPreguntaComponent } from "./components/lista-pregunta/lista-pregunta.component";
import { EditarPreguntaComponent } from "./components/editar-pregunta/editar-pregunta.component";


import { ListaRubricaComponent } from "./components/lista-rubrica/lista-rubrica.component";





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
      { path: "nuevo-ejercitario", component: NuevoEjercitarioComponent, data:{title:"Registro Ejercitario"} },
      { path: "editar-ejercitario/:id", component: NuevoEjercitarioComponent, data:{title:"Editar Ejercitario"}},
      { path: "preguntas-ver", component: CrearPreguntaComponent},
      { path: "registra-pregunta/:id", component: CrearPreguntaComponent},
      { path: "lista-pregunta/:id", component: ListaPreguntaComponent},
      { path: "editar-pregunta/:eid/:pid", component:EditarPreguntaComponent},
      
      
      { path: "lista-rubrica/:id", component:ListaRubricaComponent},
   
      


    ],
  },
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
