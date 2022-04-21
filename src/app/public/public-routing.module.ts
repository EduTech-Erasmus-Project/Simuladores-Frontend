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
      // {
      //   path: "login",
      //   loadChildren: () =>
      //     import("./pages/login/login.module").then((m) => m.LoginModule),
      // },
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
        component: RegisterExpertoComponent,
      },

      {
        path: "login",
        loadChildren: () =>
          import("../auth/login/login.module").then((m) => m.LoginModule),
        //canActivate: [CheckLoginGuard],
        data: {
          breadcrumb: "Inicio de sesión",
        },
      },
      {
        path: "register",
        loadChildren: () =>
          import("../auth/sign-up/sign-up.module").then((m) => m.SignUpModule),
        //canActivate: [CheckLoginGuard],
        data: {
          breadcrumb: "Registro",
        },
      },
      {
        path: "restart-password",
        loadChildren: () =>
          import("../auth/recover-password/recover-password.module").then(
            (m) => m.RecoverPasswordModule
          ),
        data: {
          breadcrumb: "Reestablecer contraseña",
        },
      },
      {
        path: "password-resed/:uidb64/:token",
        loadChildren: () =>
          import("../auth/password-resed/password-resed.module").then(
            (m) => m.PasswordResedModule
          ),
        data: {
          breadcrumb: "Reestablecer contraseña",
        },
      },
      {
        path: "reset/:?",
        loadChildren: () =>
          import("../auth/reset/reset.module").then((m) => m.ResetModule),
        data: {
          breadcrumb: "Contraseña reestablecida",
        },
      },
      {
        path: "emailMessage",
        loadChildren: () =>
          import("../auth/emailMessage/email-message.module").then(
            (m) => m.EmailMessageModule
          ),
        data: {
          breadcrumb: "Enlace enviado",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
