import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "src/app/shared/shared.module";
import { ListaExpertoPorAprobarComponent } from './lista-experto-por-aprobar/lista-experto-por-aprobar.component';
import { ListaExpertosRechazadosComponent } from './lista-expertos-rechazados/lista-expertos-rechazados.component';
import { ListaExpertosRegistradosPlaformaComponent } from './lista-expertos-registrados-plaforma/lista-expertos-registrados-plaforma.component';
import { ListaCompetenciasComponent } from './lista-competencias/lista-competencias.component';
import { ListaEjercitariosComponent } from './lista-ejercitarios/lista-ejercitarios.component';
import { PrincipalesDiscapacidadesComponent } from './principales-discapacidades/principales-discapacidades.component';
import { ListaUsuariosRegPlatComponent } from './lista-usuarios-reg-plat/lista-usuarios-reg-plat.component';
import { InformacionCountComponent } from './informacion-count/informacion-count.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
   
    ListaCompetenciasComponent,
    ListaEjercitariosComponent,
    ListaExpertoPorAprobarComponent,
    ListaExpertosRechazadosComponent,
    ListaExpertosRegistradosPlaformaComponent,
    PrincipalesDiscapacidadesComponent,
    ListaUsuariosRegPlatComponent,
    InformacionCountComponent
  ],
  imports: [ CommonModule, SharedModule, ReactiveFormsModule],
  exports: [
    
    ListaCompetenciasComponent,
    ListaEjercitariosComponent,
    ListaExpertoPorAprobarComponent ,
    ListaExpertosRechazadosComponent,
    ListaExpertosRegistradosPlaformaComponent,
    PrincipalesDiscapacidadesComponent,
    ListaUsuariosRegPlatComponent
  ],
})
export class ComponentsModule { }
