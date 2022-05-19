import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ScrollPanel } from "primeng/scrollpanel";
import { Table } from "primeng/table";
import { Actividad } from "src/app/core/interfaces/Actividad";
import { User } from "src/app/core/interfaces/User";
import { Customer, Representative } from "src/app/demo/domain/customer";
import { Comentario } from "src/app/core/interfaces/Comentario";
import { DiscapacidadParticipanteInterface } from "src/app/core/interfaces/DiscapacidadParticipante";
import { ExperienciaLaboralInterface } from "src/app/core/interfaces/ExperienciaLaboral";
import { AuthService } from "src/app/service/auth.service";
import { InformacionParticipanteService } from "src/app/service/informcionParticpante/informacion-participante.service";
import { DiscapacidadesService } from "src/app/service/discapacidades.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { ActividadService } from "src/app/service/actividad.service";
import * as moment from "moment";
import { CompetenciaService } from "src/app/service/competencia.service";
import { Ejercitario } from "src/app/core/interfaces/Ejercitario";
import { UsuarioService } from "src/app/service/usuario.service";
import { Competencia } from "src/app/core/interfaces/Competencia";

@Component({
  selector: "app-participante-info",
  templateUrl: "./participante-info.component.html",
  styleUrls: ["./participante-info.component.scss"],
})
export class ParticipanteInfoComponent implements OnInit {
  public idParticipante: number;
  private idCompetencia: number;
  public modalPerfil: boolean;
  public modalComentarios: boolean;
  public modalPreguntas: boolean;
  public niveles: any[];
  public nivel = "Nivel1";
  public ejercitarios: Ejercitario[];
  public ejercitario: number;
  public loading: boolean = true;
  public actividades: Actividad[];
  public competencia: Competencia;

  public idActividad : number;

  public charLineNotaData = {};
  public charLineTiempoaData = {};

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
    private router: Router
  ) {
    console.log(this._Activatedroute.snapshot.params);

    if (
      isNaN(+this._Activatedroute.snapshot.params?.idCompetencia) ||
      isNaN(+this._Activatedroute.snapshot.params?.idEstudiante)
    ) {
      this.router.navigate(["/expert"]);
    }
    this.idCompetencia = +this._Activatedroute.snapshot.params.idCompetencia;
    this.idParticipante = +this._Activatedroute.snapshot.params.idEstudiante;

    console.log(this.idCompetencia);
    console.log(this.idParticipante);
  }

  ngOnInit(): void {
    this.loadData();
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

  showModalComentarios(idActividad: number) {
    this.idActividad = idActividad;
    this.modalComentarios = true;
  }

  // agregarComentario(scroll: ScrollPanel) {
  //   let date: Date = new Date();
  //   var comentarioNuevo: Comentario = {
  //     //comentario: this.newComentarioParticipanteEjercitario,
  //     fechaComentario: date,
  //     //comentarioActividad: this.actividadSeleccionada,
  //   };

  //   this.confirmationService.confirm({
  //     key: "agregarComentario",
  //     message: "Agregar nuevo Comentario",
  //     icon: "pi pi-exclamation-triangle",
  //     accept: () => {
  //       // this.usuarioService.agregarNuevoComentarioActividadParticipante(
  //       //   comentarioNuevo
  //       // );
  //       // this.listadoComentariosActividad.unshift({
  //       //   idComentario: 0,
  //       //   //comentario: this.newComentarioParticipanteEjercitario,
  //       //   fechaComentario: date,
  //       //   comentarioActividad_id: 0,
  //       // });
  //       scroll.refresh();
  //       this.messageService.add({
  //         key: "addComentTOAST",
  //         severity: "success",
  //         summary: "Comentario agregado",
  //         detail: "El comentario a sido agregado correctamente",
  //       });
  //     },
  //     reject: () => {
  //       this.messageService.add({
  //         key: "addComentTOAST",
  //         severity: "error",
  //         summary: "Acción Cancelada",
  //         detail: "La acción no se llevo a cabo",
  //       });
  //     },
  //   });
  // }

  // PARA SELECT DE GRAFICA tIPO DE DISCAPACIDAD GENERAL
  // selGrafica1: any = { name: "Notas", value: "Notas" };

  // opciones: any[] = [
  //   { name: "Notas", value: "Notas" },
  //   { name: "Tiempo", value: "Tiempo" },
  // ];

  calificacionPorcentaje(actividad: Actividad): number {
    return Number(
      ((actividad.calificacion * 100) / actividad.totalPreguntas).toFixed(2)
    );
  }

  public showModal() {
    this.modalPerfil = true;
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
      this.actividades = actividades;
      this.loadGrafica();
    } catch (error) {
      console.log(error);
    }
  }
}
