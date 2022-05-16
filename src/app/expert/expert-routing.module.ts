import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExpertComponent } from "./expert.component";
import { DatosExpertoComponent } from "./pages/datos-experto/datos-experto.component";
import { ParticipanteInfoComponent } from "./pages/participante-info/participante-info.component";
import { ParticipantesComponent } from "./pages/participantes/participantes.component";
import { PresentacionInicioExpertoComponent } from "./pages/presentacion-inicio-experto/presentacion-inicio-experto.component";

const routes: Routes = [
  {
    path: "",
    component: ExpertComponent,
    children: [
      { path: "", component: PresentacionInicioExpertoComponent },

      { path: "mi-cuenta", component: DatosExpertoComponent },
      // {
      //   path: "agregarActividadParticipantes",
      //   component: AgregarActividadesParticipanteComponent,
      // },
      {
        path: "participantes",
        component: ParticipantesComponent,
      },
      // {
      //   path: "escenarioInfo/:idEjercitario",
      //   component: EscenarioComponent,
      // },
      {
        path: "participanteInfo/:idCompetencia/:idEstudiante",
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
