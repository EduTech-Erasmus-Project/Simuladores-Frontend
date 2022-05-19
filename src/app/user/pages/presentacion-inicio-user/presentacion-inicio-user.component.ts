import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbService } from "src/app/service/breadcrumb.service";
import { PhotoService } from "src/app/demo/service/photoservice";
import { Asignacion } from "src/app/core/interfaces/Asignacion";
import { Escenario } from "src/app/core/interfaces/Escenario";
import { EjercitarioParticipanteService } from "src/app/service/ejercitarioParticipante/ejercitario-participante.service";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-presentacion-inicio-user",
  templateUrl: "./presentacion-inicio-user.component.html",
  styles: [],
})
export class PresentacionInicioUserComponent implements OnInit {
  public correoParticanteInicio: string = "";
  public images: any[];
  public listadoAsignaciones: Array<Asignacion> = [];
  public listadoEjercitarios: Array<any>;

  constructor(
    private autentificacionUsuario: AuthService,
    private router: Router,
    private ejercitarioService: EjercitarioParticipanteService,
    private _Activatedroute: ActivatedRoute,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("correo") != null) {
      if (
        this._Activatedroute.snapshot.paramMap.get("correo") ==
        this.autentificacionUsuario.emailUser
      ) {
        this.correoParticanteInicio =
          this._Activatedroute.snapshot.paramMap.get("correo");
      } else {
        this.autentificacionUsuario.logout();
      }
    } else if (this.autentificacionUsuario.emailUser != null) {
      this.correoParticanteInicio = this.autentificacionUsuario.emailUser;
    } else {
      this.correoParticanteInicio =
        this.autentificacionUsuario.getcorreoPorToken(
          this.autentificacionUsuario.getToken
        );
    }

    this.obtenercionAsignacionesEjercitario();
  }

  obtenercionAsignacionesEjercitario() {
    this.ejercitarioService
      .obtenerAsignacionesEjercitario(this.correoParticanteInicio)
      .subscribe((asignaciones) => {
        this.setListadoAsignaciones(asignaciones.asignaciones);
      });
  }

  setListadoAsignaciones(asignaciones: Array<any>) {
    var asignacionesLista: Array<Asignacion> = [];
    var asiganacionAUX: Asignacion;
    var escenario: Escenario;

    asignaciones.forEach((asignacion) => {
      this.ejercitarioService
        .obtenerEjercitario(asignacion.ejercitario_id)
        .subscribe((ejercitario) => {
          let escenario = ejercitario;
          let asignacion = ejercitario;
          asignacion.escenario = escenario;
          asignacionesLista.push(asignacion);
        });
    });

    this.listadoAsignaciones = asignacionesLista;
  }

  realizarEjercitario(urlEjercitario: string, numeroDeEjercitario: number) {
    console.log(
      "abir ejercitario: " +
        numeroDeEjercitario +
        " al participante: " +
        this.correoParticanteInicio +
        " url: " +
        urlEjercitario
    );
    //this.router.navigate([urlEjercitario], { queryParams: { 'correo': this.correoParticanteInicio , 'ejercitario':idEjercitario}});
    window.open(
      urlEjercitario +
        "?correo=" +
        this.correoParticanteInicio +
        "&ejercitario=" +
        numeroDeEjercitario
    );
    //Colocar en esta seccion el direccionamiento hacia los ejercitarios
  }
}
