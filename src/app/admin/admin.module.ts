import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { ExpertosComponent } from './pages/expertos/expertos.component';
import { SimuladoresComponent } from './pages/simuladores/simuladores.component';
import { DatosAdminComponent } from './pages/datos-admin/datos-admin.component'


import { RouterModule } from '@angular/router';
import { TopBarPageExpertoComponent } from '../expert/pages/StructurePage-Experto/top-bar-page-experto/top-bar-page-experto.component';



@NgModule({
  declarations: [AdminComponent, HomeComponent, ExpertosComponent, SimuladoresComponent, DatosAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule,

  ]
})
export class AdminModule { }