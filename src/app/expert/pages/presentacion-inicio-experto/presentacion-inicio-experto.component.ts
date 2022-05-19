import { Component, OnDestroy, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { forkJoin, Subscription } from "rxjs";
import { Competencia } from "src/app/core/interfaces/Competencia";
import { Participante } from "src/app/core/interfaces/Participante";
import { CompetenciaService } from "src/app/service/competencia.service";
import { EjercitarioService } from "src/app/service/ejercitario.service";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
  selector: "app-presentacion-inicio-experto",
  templateUrl: "./presentacion-inicio-experto.component.html",
  styleUrls: ["./presentacion-inicio-experto.component.scss"],
})
export class PresentacionInicioExpertoComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  public competencia: Competencia;
  public competencias: Competencia[] = [];
  public loaderGrafica: boolean = false;
  public totalParticipantes: number = 0;
  public totalEjercitarios: number = 0;
  public dropdownTipo: SelectItem[] = [
    { label: "Discapacidad", value: "Discapacidad" },
    { label: "Genero", value: "Genero" },
    { label: "Competencias", value: "Competencias" },
  ];
  public pieData: any;
  //public ejercitarios: Asignacion[] = [];
  public usuario: any;

  public chartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Participantes por discapacidad",
    },
  };

  public participantes: Participante[];
  public displayMaximizable: boolean;
  public idParticipante: number;

  constructor(
    private competenciaService: CompetenciaService,
    private usuarioService: UsuarioService,
    private ejercitarioService: EjercitarioService
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async ngOnInit() {
    this.loadData();
    this.listarLabelsTipoDeDiscacidad();
  }

  private async loadData() {
    let sub = await forkJoin([
      this.ejercitarioService.obtenerTotalEjercitarios(),
      this.competenciaService.obtenerCompetencias(),
      this.usuarioService.totalParticipantesPorEvaluador(),
    ]).subscribe(
      (data) => {
        this.totalEjercitarios = data[0].total;
        this.competencias = data[1];
        this.totalParticipantes = data[2].totalParticipantes;
      },
      (err) => {
        console.log(err);
      }
    );
    this._subscriptions.push(sub);
    this.listarLabelsTipoDeDiscacidad();
  }

  private async listarLabelsTipoDeDiscacidad() {
    let sub = await this.usuarioService
      .recuperarListaDiscapacidades()
      .subscribe(
        (discapacidad) => {
          //console.log("discapacidad", discapacidad);
          this.pieData = {
            labels: discapacidad.participanteDiscapacidad.map((dis) =>
              Object.keys(dis)
            ),
            datasets: [
              {
                data: discapacidad.participanteDiscapacidad.map((dis) =>
                  Object.values(dis)
                ),
                backgroundColor: [
                  "rgb(54, 162, 235)",
                  "rgb(255, 99, 132)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                ],
              },
            ],
          };
          this.loaderGrafica = false;
        },
        (err) => {
          console.log(err);
          this.loaderGrafica = false;
        }
      );

    this._subscriptions.push(sub);
  }

  async onChangeTipo(evt) {
    this.loaderGrafica = true;
    switch (evt.value) {
      case "Discapacidad":
        this.listarLabelsTipoDeDiscacidad();
        this.chartOptions.title.text = "Participantes por discapacidad";
        break;
      case "Genero":
        this.listarLabelsTipoDeGenero();
        this.chartOptions.title.text = "Participantes por genero";
        break;
      case "Competencias":
        this.listaEjercitariosPorParticipantes();
        this.chartOptions.title.text = "Participantes por competencias";
        break;
    }
    //console.log(evt.value);
  }

  async listarLabelsTipoDeGenero() {
    let sub = await this.usuarioService.recuperarListaDeGenero().subscribe(
      (genero) => {
        console.log("generos", genero.participanteGenero);
        console.log(
          "generos",
          genero.participanteGenero.map((gen) => Object.keys(gen))
        );
        this.pieData = {
          labels: genero.participanteGenero.map((gen) => Object.keys(gen)),
          datasets: [
            {
              data: genero.participanteGenero.map((gen) => Object.values(gen)),
              backgroundColor: [
                "rgb(54, 162, 235)",
                "rgb(255, 99, 132)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
              ],
            },
          ],
        };
        this.loaderGrafica = false;
      },
      (err) => {
        console.log(err);
        this.loaderGrafica = false;
      }
    );
    this._subscriptions.push(sub);
  }

  async listaEjercitariosPorParticipantes() {
    console.log("ejercitario metdodo");
    let sub = await this.usuarioService
      .recuperarListaEjercitariosPorParticipantes()
      .subscribe(
        (ejercitarios) => {
          console.log("ejercitarios", ejercitarios);
          console.log("ejercitarios", ejercitarios.participanteEjercitario);
          this.pieData = {
            labels: ejercitarios.participanteEjercitario.map((eje) =>
              Object.keys(eje)
            ),
            datasets: [
              {
                data: ejercitarios.participanteEjercitario.map((eje) =>
                  Object.values(eje)
                ),
                backgroundColor: [
                  "rgb(54, 162, 235)",
                  "rgb(255, 99, 132)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                ],
              },
            ],
          };
          this.loaderGrafica = false;
        },
        (err) => {
          console.log(err);
          this.loaderGrafica = false;
        }
      );

    this._subscriptions.push(sub);
  }

  public async showModal(id) {
    try {
      let user = await this.usuarioService
        .obtenerInformacionParticipante(id)
        .toPromise();
      this.usuario = user;
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }

  async onChangeCompetencia(evt) {
    console.log(evt.value);
    try {
      let participantes = await this.usuarioService
        .obtenerParticipantesCompetencia(evt.value.id)
        .toPromise();
      console.log("participantes", participantes);
      this.participantes = participantes;
    } catch (error) {
      console.log("error", error);
    }
  }
}
