import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { RespuestasComponent } from "./respuestas/respuestas.component";
import { ListaPendientesComponent } from "./lista-pendientes/lista-pendientes.component";
import { ListaParticipantesComponent } from "./lista-participantes/lista-participantes.component";
import { ListaRechazadosComponent } from "./lista-rechazados/lista-rechazados.component";

@NgModule({
  declarations: [
    RespuestasComponent,
    ListaPendientesComponent,
    ListaParticipantesComponent,
    ListaRechazadosComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    RespuestasComponent,
    ListaPendientesComponent,
    ListaParticipantesComponent,
    ListaRechazadosComponent,
  ],
})
export class ComponentsModule {}
