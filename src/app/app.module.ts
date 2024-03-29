import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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

import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { QuicklinkModule } from "ngx-quicklink";
import { TranslateModule } from "@ngx-translate/core";
import { CountryService } from "./demo/service/countryservice";
import { CustomerService } from "./demo/service/customerservice";
import { EventService } from "./demo/service/eventservice";
import { IconService } from "./demo/service/iconservice";
import { NodeService } from "./demo/service/nodeservice";
import { PhotoService } from "./demo/service/photoservice";
import { ProductService } from "./demo/service/productservice";
import { AuthInterceptor } from "./intercepotors/auth.interceptor";
import { NgCircleProgressModule } from "ng-circle-progress";
import { PublicModule } from "./public/public.module";





@NgModule({
  imports: [

    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    PublicModule,
    UserModule,
    AdminModule,
    QuicklinkModule,
    TranslateModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MenuService,
    BreadcrumbService,
    ConfirmationService,
    MessageService,
    DatePipe,
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}