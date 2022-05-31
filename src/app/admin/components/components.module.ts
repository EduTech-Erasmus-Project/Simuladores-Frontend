import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  } from '../pages/nuevo-ejercitario/nuevo-ejercitario.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SimuladoresComponent } from '../pages/simuladores/simuladores.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule, 
    DropdownModule,
    ButtonModule,
  ],
  exports: [
    MessageModule,
    MessagesModule, 
    DropdownModule,
    ButtonModule,
  ],
})
export class ComponentsModule { }
