import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { DatosUsuarioComponent } from "./pages/datos-usuario/datos-usuario.component";
import { PaginaPrincipalUsuarioComponent } from "./pages/pagina-principal-usuario/pagina-principal-usuario.component";
import { PresentacionInicioUserComponent } from "./pages/presentacion-inicio-user/presentacion-inicio-user.component";
import { SharedModule } from "../shared/shared.module";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ActividadComponent } from "./pages/actividad/actividad.component";

@NgModule({
  declarations: [
    UserComponent,
    DatosUsuarioComponent,
    PaginaPrincipalUsuarioComponent,
    PresentacionInicioUserComponent,
    ActividadComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgCircleProgressModule
    
  ],
})
export class UserModule {}
