import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { ExpertosComponent } from './pages/expertos/expertos.component';
import { SimuladoresComponent } from './pages/simuladores/simuladores.component'


@NgModule({
  declarations: [AdminComponent, HomeComponent, ExpertosComponent, SimuladoresComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AdminModule { }
