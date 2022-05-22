import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ComentariosComponent } from './comentarios/comentarios.component';
import { RespuestasComponent } from './respuestas/respuestas.component';

@NgModule({
  declarations: [ComentariosComponent, RespuestasComponent],
  imports: [CommonModule, SharedModule],
  exports: [ComentariosComponent, RespuestasComponent],
})
export class ComponentsModule {}
