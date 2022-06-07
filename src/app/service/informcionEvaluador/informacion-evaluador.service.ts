import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/core/interfaces/User";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InformacionEvaluadorService {
  constructor(private http: HttpClient) {}

  public obtenerInformacionEvaluador(id: number): Observable<any> {
    //console.log("getEvaluador");
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.get<any>(
      environment.WS_PATH + "getEvaluador/" + id,
      config
    );
  }

  public obtenerInformacionEvaluadorCorreo(correo: string): Promise<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(environment.WS_PATH + "getEvaluador/" + correo, config)
      .toPromise()
      .then((res) => res as User)
      .then((responsable) => responsable);
  }

  public obtenerParticipantesPorAceptarEvaluadorCorreo(correo: string) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "getParticipantesEvaluadorAceptar/" + correo,
        config
      )
      .toPromise()
      .then((res) => res.participantesAceptacion as User[])
      .then((participantesAceptacion) => participantesAceptacion);
  }

  public obtenerParticipantesEvaluadorCorreo(correo: string) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "getParticipantesEvaluadorAceptados/" + correo,
        config
      )
      .toPromise()
      .then((res) => res.participantes as User[])
      .then((participantes) => participantes);
  }

  public agregarParticipante(email: string) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "agregarParticipanteEvaluador/" + email,
        config
      )
      .toPromise()
      .then((res) => console.log(res));
  }

  public eliminarParticipante(email: string) {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(
        environment.WS_PATH + "eliminarParticipanteEvaluador/" + email,
        config
      )
      .toPromise()
      .then((res) => console.log(res));
  }

  public recuperarEvaluadoresParaRegistro() {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .get<any>(environment.WS_PATH + "getEvaluadores/", config)
      .toPromise()
      .then((res) => res.evaluadores);
  }

  public registrarNuevoExperto(experto: User): Observable<any> {
    const config = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<any>(
      environment.WS_PATH + "registrarEvaluadores",
      experto,
      config
    );
  }
}
