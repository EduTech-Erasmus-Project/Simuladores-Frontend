import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "src/app/shared/shared.module";
import { ListaExpertoPorAprobarComponent } from './lista-experto-por-aprobar/lista-experto-por-aprobar.component';
import { ListaExpertosRechazadosComponent } from './lista-expertos-rechazados/lista-expertos-rechazados.component';
import { ListaExpertosRegistradosPlaformaComponent } from './lista-expertos-registrados-plaforma/lista-expertos-registrados-plaforma.component';
import { ListaCompetenciasComponent } from './lista-competencias/lista-competencias.component';
import { ListaEjercitariosComponent } from './lista-ejercitarios/lista-ejercitarios.component';




@NgModule({
  declarations: [
   
    ListaCompetenciasComponent,
    ListaEjercitariosComponent,
    ListaExpertoPorAprobarComponent,
    ListaExpertosRechazadosComponent,
    ListaExpertosRegistradosPlaformaComponent
  ],
  imports: [ CommonModule, SharedModule ],
  exports: [
    
    ListaCompetenciasComponent,
    ListaEjercitariosComponent,
    ListaExpertoPorAprobarComponent ,
    ListaExpertosRechazadosComponent,
    ListaExpertosRegistradosPlaformaComponent
  ],
})
export class ComponentsModule { }
