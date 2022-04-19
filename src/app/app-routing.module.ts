import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { QuicklinkStrategy } from "ngx-quicklink";
import { AppErrorComponent } from "./public/pages/error/app.error.component";
import { AppNotfoundComponent } from "./public/pages/notfound/app.notfound.component";
import { AppAccessdeniedComponent } from "./public/pages/accessdenied/app.accessdenied.component";


const routes: Routes = [
  { path: "error", component: AppErrorComponent },
  { path: "notfound", component: AppNotfoundComponent },
  { path: "accessdenied", component: AppAccessdeniedComponent },

  {
    path: "",
    loadChildren: () =>
      import("./public/public.module").then((m) => m.PublicModule),
  },

  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "expert",
    loadChildren: () =>
      import("./expert/expert.module").then((m) => m.ExpertModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },

  //{ path: "error", component: AppErrorComponent },
  //{ path: "accessdenied", component: AppAccessdeniedComponent },
  //{ path: "notfound", component: AppNotfoundComponent },

  //move to modules
  //{ path: "", component: LandingComponent },

  //{ path: "login", component: LoginUserComponent },
  //{ path: "inicio", component: LandingComponent },
  //{ path: "about-us", component: AboutUsComponent },

  // {
  //   path: "terminos-condiciones",
  //   component: TerminosCondicionesComponent,
  // },
  //{ path: "registrar", component: RegistrarUserComponent },
  // { path: "registrarExperto", component: RegisterExpertoComponent },

  // {
  //   path: "Pagina-Principal-Usuario",
  //   component: PaginaPrincipalUsuarioComponent,
  //   children: [
  //     { path: "", component: PresentacionInicioUserComponent },
  //     {
  //       path: "inicio/:correo",
  //       component: PresentacionInicioUserComponent,
  //     },
  //     {
  //       path: "Mis-Actividades-Usuario/:correo",
  //       component: MisActividadesUsuarioComponent,
  //     },
  //     { path: "datosUsuario/:correo", component: DatosUsuarioComponent },
  //   ],
  //   canActivate: [AutentificarGuard],
  // },
  // {
  //   path: "Pagina-Principal-Experto",
  //   component: PaginaPrincipalExpertoComponent,
  //   children: [
  //     { path: "", component: PresentacionInicioExpertoComponent },
  //     {
  //       path: "inicio/:correo",
  //       component: PresentacionInicioExpertoComponent,
  //     },
  //     { path: "datosExperto/:correo", component: DatosExpertoComponent },
  //     {
  //       path: "agregarActividadParticipantes/:correo",
  //       component: AgregarActividadesParticipanteComponent,
  //     },
  //     {
  //       path: "agregarAlumno/:correo",
  //       component: AgregarAlumnoAExpertoComponent,
  //     },
  //     {
  //       path: "escenarioInfo/:correo/:idEjercitario",
  //       component: EscenarioComponent,
  //     },
  //     {
  //       path: "participanteInfo/:correo/:idEjercitario/:correoEstudiante",
  //       component: ParticipanteInfoComponent,
  //     },
  //   ],
  //   canActivate: [AutentificarGuard],
  // },

  //{ path: "**", redirectTo: "/notfound" },
  { path: "**", redirectTo: "notfound", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      //scrollPositionRestoration: 'enabled',
      enableTracing: false,
      paramsInheritanceStrategy: "always",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
