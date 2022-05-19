import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { DatosUsuarioComponent } from "./pages/datos-usuario/datos-usuario.component";
import { MisActividadesUsuarioComponent } from "./pages/mis-actividades-usuario/mis-actividades-usuario.component";
import { PaginaPrincipalUsuarioComponent } from "./pages/pagina-principal-usuario/pagina-principal-usuario.component";
import { PresentacionInicioUserComponent } from "./pages/presentacion-inicio-user/presentacion-inicio-user.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    UserComponent,
    DatosUsuarioComponent,
    MisActividadesUsuarioComponent,
    PaginaPrincipalUsuarioComponent,
    PresentacionInicioUserComponent
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
