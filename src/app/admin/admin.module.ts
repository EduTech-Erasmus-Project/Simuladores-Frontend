import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { RouterModule } from '@angular/router';
import { TopBarPageExpertoComponent } from '../expert/pages/StructurePage-Experto/top-bar-page-experto/top-bar-page-experto.component';
import { AppTopBarComponent } from '../shared/menu-componets/app.topbar.component';


@NgModule({
  declarations: [AdminComponent,AppTopBarComponent, 
    ],
  imports: [
    CommonModule,
    //AdminRoutingModule,
    //  RouterModule,
      
   
  ]
})
export class AdminModule { }