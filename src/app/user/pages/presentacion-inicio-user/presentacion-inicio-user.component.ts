import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { CompetenciaService } from "src/app/service/competencia.service";
import { forkJoin, Subscription } from "rxjs";
import { Competencia } from "src/app/core/interfaces/Competencia";
import { ActividadService } from "src/app/service/actividad.service";
import { Actividad } from "src/app/core/interfaces/Actividad";
import { UsuarioService } from "src/app/service/usuario.service";
import { Evaluador } from "src/app/core/interfaces/Evaluador";
import { ReportePdf } from "src/app/core/models/Reporte";
import pdfMake from "pdfmake/build/pdfmake";
import * as moment from "moment";

@Component({
  selector: "app-presentacion-inicio-user",
  templateUrl: "./presentacion-inicio-user.component.html",
  styleUrls: ["./presentacion-inicio-user.component.scss"],
})
export class PresentacionInicioUserComponent implements OnInit, OnDestroy {
  public correoParticanteInicio: string = "";
  public competencia: Competencia;
  public competencias: Competencia[] = [];
  private _subscriptions: Subscription[] = [];
  public download = false;
  public actividades: Actividad[] = [];
  public loading = false;
  public displayMaximizable: boolean = false;
  //public usuario:User;
  public evaluador: Evaluador;
  private nivelIdx: number = 0;

  constructor(
    private authService: AuthService,
    private competenciaService: CompetenciaService,
    private actividadService: ActividadService,
    private usuarioService: UsuarioService
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadData();
  }

  private get user() {
    return this.authService.user;
  }

  private async loadData() {
    let sub = await forkJoin([
      this.competenciaService.obtenerCompetencias(),
    ]).subscribe(
      (data) => {
        //console.log(data);
        this.competencias = data[0];
        this.competencia = this.competencias[0];
        this.listarProgreso(this.competencia.niveles[0].ejercitarios[0].id);
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

  async downloadCertificado() {
    if (!this.competencia?.niveles[2]?.status) return;

    try {
      let reporteData = await this.usuarioService
        .getReporte(this.competencia.id, this.user.participante.id)
        .toPromise();
      //console.log("reporte", reporteData);
      let reporte = new ReportePdf(reporteData);
      this.download = true;
      await pdfMake.createPdf(reporte.docDefinition()).download(moment().format('YYYY-MM-DD'));
      this.download = false;
    } catch (error) {
      console.log(error);
      this.download = false;
    }
  }

  async listarProgreso(idEjercitario: number) {
    //console.log(idEjercitario);
    try {
      let actividades = await this.actividadService
        .getParticipanteActividades(idEjercitario)
        .toPromise();
      //console.log(actividades);
      this.actividades = actividades;
    } catch (error) {
      console.log(error);
    }
  }

  async showModalUser() {
    try {
      this.evaluador = await this.usuarioService
        .getEvaluador(this.user.participante.evaluador)
        .toPromise();
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }

  onChangePanel(event) {
    //console.log(event);
    this.actividades = [];
    this.nivelIdx = event.index;
    this.listarProgreso(
      Number(this.competencia?.niveles[event.index]?.ejercitarios[0]?.id)
    );
  }

  onChangeCompetencia(event) {
    console.log({value: event.target.value});
    this.actividades = [];
    this.competencia = this.competencias.find(
      (comp) => comp.id == event.target.value
      );

    this.listarProgreso(
      Number(this.competencia?.niveles[this.nivelIdx]?.ejercitarios[0]?.id)
    );

    // this.listarProgreso(
    //   Number(this.competencia?.niveles[this.nivelIdx]?.ejercitarios[0]?.id)
    // );
  }

}
