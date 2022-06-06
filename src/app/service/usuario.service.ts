import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private evt$: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {}

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

  obtenerParticipantesCompetencia(idCompetencia: number): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantesCompetencia/" + idCompetencia
    );
  }

  //validar eliminacion de metodo
  obtenerParticipantes() {
    return this.http.get<any>(environment.WS_PATH + "obtenerParticipantes/");
  }

  obtenerParticipantesPendientes(): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantesPendientes/"
    );
  }

  obtenerParticipantesRechazados(): Observable<any> {
    return this.http.get<any>(
      environment.WS_PATH + "obtenerParticipantesRechazados/"
    );
  }

  aprobarParticipantes(data): Observable<any> {
    return this.http.post<any>(
      environment.WS_PATH + "aprobarParticipante/",
      data
    );
  }

  getEvaluador(id: number): Observable<any> {
    return this.http.get<any>(environment.WS_PATH + "getEvaluador/" + id);
  }

  actualizarPassword(data: any) {
    return this.http.post<any>(
      environment.WS_PATH + "actualizarPassword/",
      data
    );
  }

  public obtenerInformacionParticipante(id: number): Observable<any> {
    return this.http.get<any>(environment.WS_PATH + "getParticipante/" + id);
  }

  get event() {
    return this.evt$;
  }

  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  getPerfil() {
    return this.http.get<any>(environment.WS_PATH + "perfil/");
  }

  editarPerfil(data) {
    return this.http.post<any>(environment.WS_PATH + "perfil/", data);
  }

  updateImage(fileImage: File) {
    const formData = new FormData();
    formData.append("file", fileImage);
    return this.http.put<any>(environment.WS_PATH + "actualizarImagenPerfil/", formData);
  }

  getReporte(idEjercitario:number, idParticipante:number){
    return this.http.get<any>(environment.WS_PATH + "reporte/" + idEjercitario + "/" + idParticipante);
  }

  downloadCertificado(idCompetencia, idParticipante){
    //console.log(idCompetencia, idParticipante);
    return this.http.get(environment.WS_PATH + "descargarCertificado/" + idCompetencia + "/" + idParticipante);
  }
}
