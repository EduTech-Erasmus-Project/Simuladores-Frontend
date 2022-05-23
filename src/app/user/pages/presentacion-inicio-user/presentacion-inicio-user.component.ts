import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbService } from "src/app/service/breadcrumb.service";
import { PhotoService } from "src/app/demo/service/photoservice";
import { Asignacion } from "src/app/core/interfaces/Asignacion";
import { Escenario } from "src/app/core/interfaces/Escenario";
import { EjercitarioParticipanteService } from "src/app/service/ejercitarioParticipante/ejercitario-participante.service";
import { AuthService } from "src/app/service/auth.service";
import { EjercitarioService } from "src/app/service/ejercitario.service";
import { CompetenciaService } from "src/app/service/competencia.service";
import { forkJoin, Subscription } from "rxjs";
import { Competencia } from "src/app/core/interfaces/Competencia";
import { ActividadService } from "src/app/service/actividad.service";
import { Actividad } from "src/app/core/interfaces/Actividad";
import { User } from "src/app/core/interfaces/User";
import { UsuarioService } from "src/app/service/usuario.service";
import { Evaluador } from "src/app/core/interfaces/Evaluador";
import * as moment from "moment";

@Component({
  selector: "app-presentacion-inicio-user",
  templateUrl: "./presentacion-inicio-user.component.html",
  styleUrls: ["./presentacion-inicio-user.component.scss"]
})
export class PresentacionInicioUserComponent implements OnInit, OnDestroy {
  public correoParticanteInicio: string = "";
  public competencia: Competencia;
  public competencias: Competencia[]= [];
  private _subscriptions: Subscription[] = [];
  public download = false;
  public actividades: Actividad[] = [];
  public loading = false;
  public displayMaximizable: boolean = false;
  //public usuario:User;
  public evaluador: Evaluador;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ejercitarioService: EjercitarioService,
    private _Activatedroute: ActivatedRoute,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private photoService: PhotoService,
    private competenciaService:CompetenciaService,
    private actividadService:ActividadService,
    private usuarioService:UsuarioService

  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadData();
  }

  private get user(){
    return this.authService.user;
  }

  private async loadData() {
    let sub = await forkJoin([
      this.competenciaService
      .obtenerCompetencias(),
      
    ]).subscribe(
      (data) => {
        this.competencias = data[0];
        this.competencia = this.competencias[0];
        console.log(this.competencia);
      },
      (err) => {
        console.log(err);
      }
    );
    this._subscriptions.push(sub);
  }

  
  realizarEjercitario(urlEjercitario: string, numeroDeEjercitario: number) {
    window.open(
      urlEjercitario +
        "?correo=" +
        this.user.participante.ref +
        "&ejercitario=" +
        numeroDeEjercitario
    );
  }

  async downloadCertificado(){
    //console.log(idCompetencia);
    this.download = true;
  }

  async listarProgreso(idEjercitario:number) {
    console.log(idEjercitario);
    try {
      let actividades = await this.actividadService.getParticipanteActividades(idEjercitario).toPromise();
      console.log(actividades);
      this.actividades = actividades;
    } catch (error) {
      console.log(error);
    }
  }

  async showModalUser(){
    try {
      this.evaluador = await this.usuarioService.getEvaluador(this.user.participante.evaluador).toPromise();
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }
  
}
