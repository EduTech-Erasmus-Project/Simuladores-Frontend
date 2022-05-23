import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { QuicklinkStrategy } from "ngx-quicklink";
import { AppErrorComponent } from "./public/pages/error/app.error.component";
import { AppNotfoundComponent } from "./public/pages/notfound/app.notfound.component";
import { AppAccessdeniedComponent } from "./public/pages/accessdenied/app.accessdenied.component";
import { AuthGuard } from "./guards/auth.guard";
import { ExpertGuard } from "./guards/expert.guard";
import { AdminGuard } from "./guards/admin.guard";
import { UserGuard } from "./guards/user.guard";

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
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: "expert",
    loadChildren: () =>
      import("./expert/expert.module").then((m) => m.ExpertModule),
      canActivate: [AuthGuard, ExpertGuard]
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
      //canActivate: [AuthGuard, AdminGuard]
  },
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
