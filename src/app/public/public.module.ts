import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { RouterModule } from "@angular/router";
import { RegisterExpertoComponent } from "./pages/register-experto/register-experto.component";
import { SharedModule } from "../shared/shared.module";
import { AppNotfoundComponent } from "./pages/notfound/app.notfound.component";
import { AppErrorComponent } from "./pages/error/app.error.component";
import { AppAccessdeniedComponent } from "./pages/accessdenied/app.accessdenied.component";

@NgModule({
  declarations: [
    PublicComponent,
    RegisterExpertoComponent,
    AppNotfoundComponent,
    AppErrorComponent,
    AppAccessdeniedComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    //eliminar el shared despues de eliminar los modulos no lazy load
    SharedModule,
  ],
})
export class PublicModule {}
