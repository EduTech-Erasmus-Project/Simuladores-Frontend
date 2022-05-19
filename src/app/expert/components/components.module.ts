import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { RespuestasComponent } from './respuestas/respuestas.component';

@NgModule({
  declarations: [RespuestasComponent],
  imports: [CommonModule, SharedModule],
  exports: [RespuestasComponent],
})
export class ComponentsModule {}
