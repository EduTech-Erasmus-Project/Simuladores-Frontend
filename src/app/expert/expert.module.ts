import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExpertRoutingModule } from "./expert-routing.module";
import { ExpertComponent } from "./expert.component";
import { EscenarioComponent } from "./pages/escenario/escenario.component";
import { PresentacionInicioExpertoComponent } from "./pages/presentacion-inicio-experto/presentacion-inicio-experto.component";
import { ParticipanteInfoComponent } from "./pages/participante-info/participante-info.component";
import { DatosExpertoComponent } from "./pages/datos-experto/datos-experto.component";
import { SharedModule } from "../shared/shared.module";
import { ComponentsModule } from "./components/components.module";
import { ParticipantesComponent } from "./pages/participantes/participantes.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActividadComponent } from './pages/actividad/actividad.component';
@NgModule({
  declarations: [
    ExpertComponent,
    DatosExpertoComponent,
    EscenarioComponent,
    ParticipanteInfoComponent,
    PresentacionInicioExpertoComponent,
    ParticipantesComponent,
    ActividadComponent,
  ],
  imports: [
    CommonModule,
    ExpertRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ExpertModule {}
