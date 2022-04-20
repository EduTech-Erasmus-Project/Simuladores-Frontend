import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExpertComponent } from "./expert.component";
import { AgregarActividadesParticipanteComponent } from "./pages/agregar-actividades-participante/agregar-actividades-participante.component";
import { AgregarAlumnoAExpertoComponent } from "./pages/agregar-alumno-a-experto/agregar-alumno-a-experto.component";
import { DatosExpertoComponent } from "./pages/datos-experto/datos-experto.component";
import { EscenarioComponent } from "./pages/escenario/escenario.component";
import { ParticipanteInfoComponent } from "./pages/participante-info/participante-info.component";
import { PresentacionInicioExpertoComponent } from "./pages/presentacion-inicio-experto/presentacion-inicio-experto.component";

const routes: Routes = [
  {
    path: "",
    component: ExpertComponent,
    children: [
      { path: "", component: PresentacionInicioExpertoComponent },
      {
        path: "inicio/:correo",
        component: PresentacionInicioExpertoComponent,
      },
      { path: "datosExperto/:correo", component: DatosExpertoComponent },
      {
        path: "agregarActividadParticipantes/:correo",
        component: AgregarActividadesParticipanteComponent,
      },
      {
        path: "agregarAlumno/:correo",
        component: AgregarAlumnoAExpertoComponent,
      },
      {
        path: "escenarioInfo/:correo/:idEjercitario",
        component: EscenarioComponent,
      },
      {
        path: "participanteInfo/:correo/:idEjercitario/:correoEstudiante",
        component: ParticipanteInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertRoutingModule {}
