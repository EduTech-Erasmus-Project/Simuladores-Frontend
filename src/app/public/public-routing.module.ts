import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterExpertoComponent } from "./pages/register-experto/register-experto.component";
import { PublicComponent } from "./public.component";

const routes: Routes = [
  {
    path: "",
    component: PublicComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./pages/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "about-us",
        loadChildren: () =>
          import("./pages/about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./pages/register/register.module").then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: "terms-and-conditions",
        loadChildren: () =>
          import("./pages/terms/terms.module").then((m) => m.TermsModule),
      },
      {
        path: "register-expert",
        component: RegisterExpertoComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
