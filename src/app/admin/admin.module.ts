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
import { NuevoEjercitarioComponent } from './pages/ejercitario/nuevo-ejercitario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RouterModule } from "@angular/router";
import { PreguntasVerComponent } from './pages/preguntas-ver/preguntas-ver.component';

@NgModule({

  declarations: [AdminComponent, HomeComponent, ExpertosComponent, SimuladoresComponent, NuevoEjercitarioComponent, DatosAdminComponent, UsuariosComponent,PreguntasVerComponent] ,

  imports: [
   
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    FileUploadModule,
    NgxDropzoneModule,
    InputTextareaModule,
  ]
})
export class AdminModule {}
