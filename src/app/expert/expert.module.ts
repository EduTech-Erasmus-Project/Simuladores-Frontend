import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExpertRoutingModule } from "./expert-routing.module";
import { ExpertComponent } from "./expert.component";
import { AgregarActividadesParticipanteComponent } from "./pages/agregar-actividades-participante/agregar-actividades-participante.component";
import { EscenarioComponent } from "./pages/escenario/escenario.component";
import { PaginaPrincipalExpertoComponent } from "./pages/pagina-principal-experto/pagina-principal-experto.component";
import { PresentacionInicioExpertoComponent } from "./pages/presentacion-inicio-experto/presentacion-inicio-experto.component";
import { MenuLateralPageExpertoComponent } from "./pages/StructurePage-Experto/menu-lateral-page-experto/menu-lateral-page-experto.component";
import { ParticipanteInfoComponent } from "./pages/participante-info/participante-info.component";
import { AgregarAlumnoAExpertoComponent } from "./pages/agregar-alumno-a-experto/agregar-alumno-a-experto.component";
import { TopBarPageExpertoComponent } from "./pages/StructurePage-Experto/top-bar-page-experto/top-bar-page-experto.component";
import { DatosExpertoComponent } from "./pages/datos-experto/datos-experto.component";
import { SharedModule } from "../shared/shared.module";
import { MenuFooterPageExpertoComponent } from "./pages/StructurePage-Experto/menu-footer-page-experto/menu-footer-page-experto.component";


@NgModule({
  declarations: [
    ExpertComponent,
    AgregarActividadesParticipanteComponent,
    AgregarAlumnoAExpertoComponent,
    DatosExpertoComponent,
    EscenarioComponent,
    PaginaPrincipalExpertoComponent,
    ParticipanteInfoComponent,
    PresentacionInicioExpertoComponent,
    MenuLateralPageExpertoComponent,
    TopBarPageExpertoComponent,
    MenuFooterPageExpertoComponent

  ],
  imports: [CommonModule, ExpertRoutingModule, SharedModule],
})
export class ExpertModule {}
