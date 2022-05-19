import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/core/interfaces/User";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InfoExpertoPorEscenarioService {
  private config = {
    headers: new HttpHeaders().set("Content-Type", "application/json"),
  };

  constructor(private http: HttpClient) {}

  recuperarListadoNotaPorEscenario(
    listadoGeneroEscenario: [],
    listadoDiscapacidadEscenario: [],
    numEscenario: String
  ) {
    return this.http
      .post<any>(
        environment.WS_PATH + "obtenerNotasPorEscenario",
        {
          generoPorEscenario: listadoGeneroEscenario,
          discapacidadEscenario: listadoDiscapacidadEscenario,
          escenario: numEscenario,
        },
        this.config
      )
      .toPromise();
  }

  recuperarListadoTiempoResolucionCompletaPorEscenario(
    Genero: String,
    Discapacidad: String,
    numEscenario: String,
    evaluador: String
  ) {
    return this.http
      .post<any>(
        environment.WS_PATH + "obtenerlistaTiempoResolucionCompletaEscenario",
        {
          genero: Genero,
          discapacida: Discapacidad,
          escenario: numEscenario,
          evaluador: evaluador,
        },
        this.config
      )
      .toPromise();
  }

  recuperarListadoTiempoResolucionSoloRespuestaPorEscenario(
    listaGeneroEscenario: [],
    listadoDiscapacidadesEscenario: [],
    numEscenario: String
  ) {
    return this.http
      .post<any>(
        environment.WS_PATH +
          "obtenerlistadoTiempoResolucionSoloRespuestaEscenario",
        {
          generoEscenario: listaGeneroEscenario,
          discapacidadEscenario: listadoDiscapacidadesEscenario,
          escenario: numEscenario,
        },
        this.config
      )
      .toPromise();
  }

  crearGraficaTipoDiscapacidadVsNotaVsTiempo(
    correo: String,
    numeroEjercitario: number
  ) {
    return this.http.post<any>(
      environment.WS_PATH + "crearGraficaInicioExpertoTipoDiscapacidadVsNota",
      { evaluador: correo, numeroEjercitario: numeroEjercitario },
      this.config
    );
  }

  graficaPastelGeneroPorEjercitario(correo: String, numeroEjercitario: number) {
    return this.http
      .post<any>(
        environment.WS_PATH + "graficaPastelGeneroPorEjercitario",
        { evaluador: correo, numeroEjercitario: numeroEjercitario },
        this.config
      )
      .toPromise()
      .then((res) => res.participantes as any[])
      .then((participantes) => participantes);
  }

  recuperarEstudiantesEjercitarioResponsable(escenario: number) {
    return this.http.get<any>(
      environment.WS_PATH + "getEstudiantesEjercitarioResponsable/" + escenario
    );
  }

  recuperarNotasPorEjercitario(
    escenario: number,
    email: string
  ) {
    return this.http
      .get<any>(
        environment.WS_PATH +
          "getNotasEstudianteEjercitarioResponsable/" +
          escenario +
          "/" +
          email,
        this.config
      )
      .toPromise();
  }
}
