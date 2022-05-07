import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Actividad } from "src/app/core/interfaces/actividad";
import { User } from "src/app/core/interfaces/User";
import { Comentario } from "src/app/core/interfaces/Comentario";
import { DiscapacidadParticipanteInterface } from "src/app/core/interfaces/DiscapacidadParticipante";
import { ExperienciaLaboralInterface } from "src/app/core/interfaces/ExperienciaLaboral";
import { environment } from "src/environments/environment";
import { Asignacion } from "src/app/core/interfaces/Asignacion";

@Injectable({
  providedIn: "root",
})
export class InformacionParticipanteService {
  constructor(private http: HttpClient) {}

  public obtenerInformacionUsuario(correo: string): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.get<any>(
      environment.WS_PATH + "getParticipante/" + correo,
      config
    );
  }

  public obtenerInformacionUsuarioResponsable(
    correo: string,
    correoResponsable: string
  ): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.get<any>(
      environment.WS_PATH +
        "getParticipanteDeUnResponsable/" +
        correo +
        "/" +
        correoResponsable,
      config
    );
  }

  public cambiarPassword(
    correo: string,
    password: string,
    newPassword: string
  ): Observable<any> {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.put<any>(
      environment.WS_PATH + "changePassword",
      { correo: correo, password: password, newPassword: newPassword },
      config
    );
  }

  public eliminarCuenta(correo: string, password: string): Observable<any> {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.put<any>(
      environment.WS_PATH + "eliminarCuenta",
      { correo: correo, password: password },
      config
    );
  }

  public editarCuenta(participante: User) {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.put<any>(
      environment.WS_PATH + "editarCuenta",
      { correo: participante?.email, participante: participante },
      config
    );
  }

  public obtenerInformacionActividadesParticipantes(correo: string) {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "informacionActividadesParticipante/" + correo,
        config
      )
      .toPromise()
      .then((res) => res.actividades as Actividad[])
      .then((actividades) => actividades);
  }

  public obtenerExperienciaLaboralUsuario(correo: string) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "getExperienciaLaboralParticipante/" + correo,
        config
      )
      .toPromise()
      .then((res) => res.experienciaLaboral as ExperienciaLaboralInterface[])
      .then((experiencia) => experiencia);
  }

  public obtenerDiscapacidadesDelParticipante(correo: string) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "getDiscapacidadesDelParticipante/" + correo,
        config
      )
      .toPromise()
      .then(
        (res) =>
          res.discapacidadesParticipante as DiscapacidadParticipanteInterface[]
      )
      .then((discapacidad) => discapacidad);
  }

  public recuperarParticipantesIntentosEjercitario(
    correo: string,
    ejercitario: number
  ) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH +
          "getParticipantesIntentosEjercitario/" +
          correo +
          "/" +
          ejercitario,
        config
      )
      .toPromise()
      .then((res) => res.actividades as Actividad[])
      .then((actividad) => actividad);
  }

  public obtenerComentariosActividadRealizada(idActividad: number) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "getComentariosActividadRealizada/" + idActividad,
        config
      )
      .toPromise()
      .then((res) => res.comentarios as Comentario[])
      .then((comentario) => comentario);
  }

  public agregarNuevoComentarioActividadParticipante(comentario: Comentario) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .post<any>(
        environment.WS_PATH + "agregarNuevoComentarioActividadParticipante",
        {
          comentario: comentario.comentario,
          fecha: comentario.fecha,
          actividad: comentario.comentarioActividad.idActividad,
        },
        config
      )
      .toPromise();
  }

  public registrarNuevoParticipante(
    participante: User
  ): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<any>(
      environment.WS_PATH + "registrarParticipante",
      participante,
      config
    );
  }

  public registrarDiscapacidadParticipante(
    discapacidad: string,
    porcentaje: number,
    correo: string
  ): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<any>(
      environment.WS_PATH + "registrarDiscapacidad",
      { discapacidad: discapacidad, porcentaje: porcentaje, correo: correo },
      config
    );
  }

  public registrarExperienciaLaboralParticipante(
    sectorEconomicoParticipante: string,
    areaLaboralParticipante: string,
    experienciaAniosParticipante: number,
    emailParticipante: string
  ): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<any>(
      environment.WS_PATH + "registrarExperienciaLaboral",
      {
        sectorEconomico: sectorEconomicoParticipante,
        areaLaboral: areaLaboralParticipante,
        experienciaAnios: experienciaAniosParticipante,
        correo: emailParticipante,
      },
      config
    );
  }

  public obtenerInformacionAsignacionesParticipante(
    correoParticipante: string,
    correoEvaluador: string
  ) {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH +
          "obtenerInformacionAsignacionesParticipante/" +
          correoParticipante +
          "/" +
          correoEvaluador,
        config
      )
      .toPromise()
      .then((res) => res.asignaciones as Asignacion[])
      .then((asignaciones) => asignaciones);
  }

  public agregarAsignacioneParticipante(
    emailParticipanteSeleccion: string,
    correoEvaluadorActividades: string,
    fechaActividad: Date,
    selectedEjercitario: number
  ): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<any>(
      environment.WS_PATH + "agregarAsignacioneParticipante",
      {
        emailParticipanteSeleccion: emailParticipanteSeleccion,
        correoEvaluadorActividades: correoEvaluadorActividades,
        fechaActividad: fechaActividad,
        selectedEjercitario: selectedEjercitario,
      },
      config
    );
  }

  public eliminarAsignacion(idAsignacion: number) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "eliminarAsignacion/" + idAsignacion,
        config
      )
      .toPromise()
      .then((res) => console.log(res));
  }

  public obtenerInformacionLandingPage() {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(environment.WS_PATH + "obtenerInformacionLandingPage/", config)
      .toPromise();
  }
}
