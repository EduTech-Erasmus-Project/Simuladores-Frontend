import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { PaginaPrincipalUsuarioComponent } from './pages/User/pagina-principal-usuario/pagina-principal-usuario.component';
import { MisActividadesUsuarioComponent } from './pages/User/mis-actividades-usuario/mis-actividades-usuario.component';
import { AutentificarGuard } from './guards/autentificar.guard';
import { DatosUsuarioComponent } from './Pages/User/datos-usuario/datos-usuario.component';
import { PresentacionInicioUserComponent } from './Pages/User/presentacion-inicio-user/presentacion-inicio-user.component';
import { RegistrarUserComponent } from './pages/registrar-user/registrar-user.component';
import { LandingComponent } from './pages/inicio/landing/landing.component';
import { DatosExpertoComponent } from './pages/Experto/datos-experto/datos-experto.component';
import { AgregarAlumnoAExpertoComponent } from './pages/Experto/agregar-alumno-a-experto/agregar-alumno-a-experto.component';
import { PaginaPrincipalExpertoComponent } from './pages/Experto/pagina-principal-experto/pagina-principal-experto.component';
import { PresentacionInicioExpertoComponent } from './pages/Experto/presentacion-inicio-experto/presentacion-inicio-experto.component';
import { EscenarioComponent } from './pages/Experto/escenario/escenario.component';
import { ParticipanteInfoComponent } from './pages/Experto/participante-info/participante-info.component';
import { AgregarActividadesParticipanteComponent } from './pages/Experto/agregar-actividades-participante/agregar-actividades-participante.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { RegisterExpertoComponent } from './pages/register-experto/register-experto.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: LandingComponent},
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: LoginUserComponent},
            {path: 'inicio', component: LandingComponent},
            {path: 'about-us', component: AboutUsComponent},
            {path: 'terminos-condiciones', component: TerminosCondicionesComponent},
            {path: 'registrar', component: RegistrarUserComponent},
            {path: 'registrarExperto', component: RegisterExpertoComponent},
            {
                path: 'Pagina-Principal-Usuario', component: PaginaPrincipalUsuarioComponent,
                children: [
                    {path: '', component: PresentacionInicioUserComponent}, 
                    {path: 'inicio/:correo', component: PresentacionInicioUserComponent},  
                    {path: 'Mis-Actividades-Usuario/:correo', component: MisActividadesUsuarioComponent},
                    {path: 'datosUsuario/:correo', component: DatosUsuarioComponent}
                ], canActivate: [AutentificarGuard]
            },
            {
                path: 'Pagina-Principal-Experto', component: PaginaPrincipalExpertoComponent,
                children: [
                    {path: '', component: PresentacionInicioExpertoComponent},  
                    {path: 'inicio/:correo', component: PresentacionInicioExpertoComponent},  
                    {path: 'datosExperto/:correo', component: DatosExpertoComponent},
                    {path: 'agregarActividadParticipantes/:correo', component: AgregarActividadesParticipanteComponent},
                    {path: 'agregarAlumno/:correo', component: AgregarAlumnoAExpertoComponent},
                    {path: 'escenarioInfo/:correo/:idEjercitario', component: EscenarioComponent},
                    {path: 'participanteInfo/:correo/:idEjercitario/:correoEstudiante', component: ParticipanteInfoComponent}
                ], canActivate: [AutentificarGuard]
            },
            
            {path: '**', redirectTo: '/notfound'},
            
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
