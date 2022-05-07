import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { Subscription } from "rxjs";
import { Asignacion } from "src/app/core/interfaces/Asignacion";
import { Escenario } from "src/app/core/interfaces/Escenario";
import { User } from "src/app/core/interfaces/User";
import { AuthService } from "src/app/service/auth.service";
import { ConsultasParaGraficasService } from "src/app/service/consultaGraficas/consultas-para-graficas.service";
import { DiscapacidadesService } from "src/app/service/discapacidades.service";
import { InfoExpertoPorEscenarioService } from "src/app/service/paginaExpertoPorEscenario/info-experto-por-escenario.service";
import { PaginaInicioExpertoService } from "src/app/service/paginaInicioExperto/pagina-inicio-experto.service";

@Component({
  selector: "app-presentacion-inicio-experto",
  templateUrl: "./presentacion-inicio-experto.component.html",
  styleUrls: ["./presentacion-inicio-experto.component.scss"],
})
export class PresentacionInicioExpertoComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  public ejercitario: Escenario;
  public loaderGrafica: boolean = false;
  public totalParticipantes: number = 0;
  public dropdownTipo: SelectItem[] = [
    { label: "Discapacidad", value: "Discapacidad" },
    { label: "Genero", value: "Genero" },
    { label: "Ejercitarios", value: "Ejercitario" },
  ];
  public pieData: any;
  public ejercitarios: Asignacion[] = [];

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

  public participantes: User[];

  constructor(
    public servicioSeleccionarEjercitario: PaginaInicioExpertoService,
    public servicioConsultasLabelsGrafica: ConsultasParaGraficasService,
    public servicioGraficaPorEscenario: InfoExpertoPorEscenarioService
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async ngOnInit() {
    this.pieData = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702, 421],
          backgroundColor: [
            "rgb(54, 162, 235)",
            "rgb(255, 99, 132)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
        },
      ],
    };
    this.loadData();
    this.listarLabelsTipoDeDiscacidad();
  }

  private async loadData() {
    let sub = await this.servicioSeleccionarEjercitario
      .obtenerEjercitarios()
      .subscribe(
        (res) => {
          this.ejercitarios = res;
        },
        (err) => {
          console.log(err);
        }
      );

    let sub2 = await this.servicioConsultasLabelsGrafica
      .totalParticipantesPorEvaluador()
      .subscribe((res) => {
        this.totalParticipantes = res.totalParticipantes;
      });
  }

  async seleccionEscenario(evt) {
    try {
      this.ejercitario = await this.servicioSeleccionarEjercitario
        .recuperarInformacionDeEscenario(evt.value.value)
        .toPromise();

        console.log("ejercitario", this.ejercitario);

        // let res = await this.servicioGraficaPorEscenario.recuperarEstudiantesEjercitarioResponsable(
        //   evt.value.value
        // ).toPromise();
        // console.log("estudiantes", res);
        // this.participantes = res.participantes;
        await this.servicioGraficaPorEscenario.recuperarEstudiantesEjercitarioResponsable(evt.value.value).toPromise()
        .then(res =>{
          console.log("res", res);
          this.participantes = res.participantes;
          this.participantes.forEach(async (participante:any) => {
            console.log(this.ejercitario.idEjercitario, participante.email);
            await this.servicioGraficaPorEscenario.recuperarNotasPorEjercitario(evt.value.value, participante.email)
            .then(res => {
              participante.calificacion = res.notas[0].calificacion
              participante.tiempo = res.notas[0].tiempo
    
              console.log(this.participantes);
              
            });
          });
    
        })
      
    } catch (error) {
      console.log(error);
    }
  }

  private async listarLabelsTipoDeDiscacidad() {
    let sub = await this.servicioConsultasLabelsGrafica
      .recuperarListaDiscapacidades()
      .subscribe(
        (discapacidad) => {
          console.log(discapacidad);
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
      case "Ejercitario":
        this.listaEjercitariosPorParticipantes();
        this.chartOptions.title.text = "Participantes por ejercitario";
        break;
    }
    console.log(evt.value);
  }

  async listarLabelsTipoDeGenero() {
    let sub = await this.servicioConsultasLabelsGrafica
      .recuperarListaDeGenero()
      .subscribe(
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
                data: genero.participanteGenero.map((gen) =>
                  Object.values(gen)
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

  async listaEjercitariosPorParticipantes() {
    console.log("ejercitario metdodo");
    let sub = await this.servicioConsultasLabelsGrafica
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

  private async tablaEstudiantes() {
    ///// PARA LA TABLA

    await this.servicioGraficaPorEscenario.recuperarEstudiantesEjercitarioResponsable(this.ejercitario.idEjercitario).toPromise()
    .then(res =>{
      console.log("res", res);
      this.participantes = res;
      this.participantes.forEach(async (participante:any) => {
        console.log(this.ejercitario.idEjercitario, participante.email);
        await this.servicioGraficaPorEscenario.recuperarNotasPorEjercitario(this.ejercitario.idEjercitario, participante.email)
        .then(res => {
          participante.calificacion = res.notas[0].calificacion
          participante.tiempo = res.notas[0].tiempo

          console.log(this.participantes);
          
        });
      });

    })
  }
 

}
