import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfilComponent } from "./perfil/perfil.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ComentariosComponent } from './comentarios/comentarios.component';
import { RespuestasComponent } from './respuestas/respuestas.component';

@NgModule({
  declarations: [PerfilComponent, ComentariosComponent, RespuestasComponent],
  imports: [CommonModule, SharedModule],
  exports: [PerfilComponent, ComentariosComponent, RespuestasComponent],
})
export class ComponentsModule {}
