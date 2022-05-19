import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';


@NgModule({
  declarations: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InformationRoutingModule
  ]
})
export class InformationModule { }