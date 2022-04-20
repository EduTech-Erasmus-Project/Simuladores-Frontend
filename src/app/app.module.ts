import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  DatePipe,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

// Application Components
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

// Application services
import { BreadcrumbService } from "./service/breadcrumb.service";
import { MenuService } from "./service/app.menu.service";
import { RouterModule } from "@angular/router";
import { ConfirmationService, MessageService, SharedModule } from "primeng/api";
import { PublicModule } from "./public/public.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { QuicklinkModule } from "ngx-quicklink";
@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    PublicModule,
    UserModule,
    AdminModule,
    QuicklinkModule,
  ],
  declarations: [AppComponent],
  providers: [
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MenuService,
    BreadcrumbService,
    ConfirmationService,
    MessageService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
