import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  totalParticipantesPorEvaluador(): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "totalParticipantesPorEvaluador"
    );
  }

  recuperarListaDiscapacidades(): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerDiscapacidadesPorEvaluador"
    );
  }

  recuperarListaDeGenero(): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerTipoGeneroPorEvaluador"
    );
  }

  recuperarListaEjercitariosPorParticipantes(): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantesEjercitarioPorEvaluador"
    );
  }

  // obtenerParticipante(idParticipante:number): Observable<any> {
  //   return this.http.get<any>(  environment.WS_PATH + "obtenerParticipante/" + idParticipante);
  // }

  obtenerParticipantesCompetencia(idCompetencia:number): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantesCompetencia/"+idCompetencia
    );
  }

  //validar eliminacion de metodo
  obtenerParticipantes(){
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantes/"
    );
  }

  obtenerParticipantesPendientes(){
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantesPendientes/"
    );
  }

  aprobarParticipantes(data): Observable<any> {
    return this.http.post<any>(
      environment.WS_PATH + "aprobarParticipante/", data
    );
  }

  getEvaluador(id:number): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "getEvaluador/" + id
    );
  }

  public obtenerInformacionParticipante(id: number): Observable<any> {
    return this.http.get<any>(environment.WS_PATH + "getParticipante/" + id);
  }


}
