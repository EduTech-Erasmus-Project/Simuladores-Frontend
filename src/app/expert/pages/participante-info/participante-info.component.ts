import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { Actividad } from "src/app/core/interfaces/Actividad";
import { ActividadService } from "src/app/service/actividad.service";
import * as moment from "moment";
import { CompetenciaService } from "src/app/service/competencia.service";
import { Ejercitario } from "src/app/core/interfaces/Ejercitario";
import { UsuarioService } from "src/app/service/usuario.service";
import { Competencia } from "src/app/core/interfaces/Competencia";
import pdfMake from "pdfmake/build/pdfmake";
import { ReportePdf } from "src/app/core/models/Reporte";

@Component({
  selector: "app-participante-info",
  templateUrl: "./participante-info.component.html",
  styleUrls: ["./participante-info.component.scss"],
})
export class ParticipanteInfoComponent implements OnInit {
  public idParticipante: number;
  private idCompetencia: number;
  public modalPerfil: boolean;
  public niveles: any[];
  public nivel = "Nivel1";
  public ejercitarios: Ejercitario[];
  public ejercitario: number;
  public loading: boolean = true;
  public actividades: Actividad[];
  public competencia: Competencia;
  public usuario:any;

  public idActividad : number;
  public displayMaximizable: boolean = false;

  public charLineNotaData = {};
  public charLineTiempoaData = {};

  public items: MenuItem[];

  public download: boolean = false;

  public charLineOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  constructor(
    private _Activatedroute: ActivatedRoute,
    private messageService: MessageService,
    private actividadService: ActividadService,
    private competenciaService: CompetenciaService,
    private router: Router, 
    private usuarioService: UsuarioService
  ) {
    //console.log(this._Activatedroute.snapshot.params);

    if (
      isNaN(+this._Activatedroute.snapshot.params?.idCompetencia) ||
      isNaN(+this._Activatedroute.snapshot.params?.idEstudiante)
    ) {
      this.router.navigate(["/expert"]);
    }
    this.idCompetencia = +this._Activatedroute.snapshot.params.idCompetencia;
    this.idParticipante = +this._Activatedroute.snapshot.params.idEstudiante;

    //console.log(this.idCompetencia);
    //console.log(this.idParticipante);
  }

  ngOnInit(): void {
    this.items = [
      {
        label: "Descargar",
        icon: "pi pi-download",
        command: () => {
          this.downloadCert();
        },
      },
      {
        label: "Enviar por email",
        icon: "pi pi-envelope",
        command: () => {
          this.downloadCert();
        },
      },
    ];
    this.loadData();
  }

  async downloadCert(){
    //console.log()this.download = true;
   try {
     let certificado = await this.usuarioService.downloadCertificado(this.idCompetencia, this.idParticipante).toPromise();
     //console.log(certificado);
   } catch (error) {
      console.log(error);
   }

  }

  private async loadData() {
    this.loading = true;

    let compSub = await this.competenciaService
      .obtenerCompetencia(this.idCompetencia)
      .subscribe((res) => {
        
        this.competencia = res;
        this.niveles = this.competencia.niveles;
        this.ejercitario = this.competencia.niveles[0].ejercitarios[0].id;
        this.ejercitarios = this.competencia.niveles[0].ejercitarios;
        this.onChangeEjercitario();
        this.loading = false;
      });
  }

  private loadGrafica() {
    this.charLineNotaData = {
      labels: this.actividades.map((act) =>
        moment(act.fecha).format("DD/MM/YYYY")
      ).reverse(),
      datasets: [
        {
          label: "Nota",
          data: this.actividades.map((act) => act.calificacion).reverse(),
          fill: true,
          borderColor: "#05C6FF",
          tension: 0.4,
          backgroundColor: "rgba(5,198,255,0.2)",
        },
      ],
    };
    this.charLineTiempoaData = {
      labels: this.actividades.map((act) =>
        moment(act.fecha).format("DD/MM/YYYY")
      ).reverse(),
      datasets: [
        {
          label: "Tiempo",
          data: this.actividades.map((act) => act.tiempoTotal).reverse(),
          fill: true,
          borderColor: "#C014FF",
          tension: 0.4,
          backgroundColor: "rgba(192,20,255,0.2)",
        },
      ],
    };
  }

  async imprimirReporte() {
    try {
      let reporteData = await this.usuarioService
        .getReporte(this.idCompetencia, this.idParticipante)
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

  calificacionPorcentaje(actividad: Actividad): number {
    return Number(
      ((actividad.calificacion * 100) / actividad.totalPreguntas).toFixed(2)
    );
  }

  onChangeNivel() {
    this.ejercitarios = this.competencia.niveles.find(
      (nivel) => nivel.value == this.nivel
    ).ejercitarios;
    this.ejercitario = this.ejercitarios[0].id;
    this.onChangeEjercitario();
  }

  async onChangeEjercitario() {
    try {
      let actividades = await this.actividadService
        .recuperarActividadesDeParticipante(
          Number(this.ejercitario),
          this.idParticipante
        )
        .toPromise();

        //console.log("res", actividades);
      this.actividades = actividades;
      this.loadGrafica();
    } catch (error) {
      console.log(error);
    }
  }

  public async showModal() {
    try {
      let user = await this.usuarioService
        .obtenerInformacionParticipante(this.idParticipante)
        .toPromise();
      this.usuario = user;
      //console.log(this.usuario);
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }
}
