import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class CompetenciaService {
  private evt$: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {}

  obtenerCompetencias() {
    return this.http.get<any>(environment.WS_PATH + "getCompetencias/");
  }
  obtenerListaCompetencias(){
    return this. http.get<any>(environment.WS_PATH + "getCompetenciasTotal/");
  }
 

  obtenerCompetencia(idCompetencia: number) {
    return this.http.get<any>(
      environment.WS_PATH + "getCompetencia/" + idCompetencia
    );
  }

  registrarCompetencia(data): Observable<any> {
    return this.http.post<any>(environment.WS_PATH + "registroCompetencia/",data);
  }

  public editarCompetencia(id: number): Observable<any> {
    return this.http.get<any>(environment.WS_PATH + "editarCompetencia/"+ id);
  }
 
  public  guardarEditarCompetencia(data): Observable<any> {
    return this.http.put(environment.WS_PATH + "guardarEditarCompetencia/",data);
  }

  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event(){
    return this.evt$;
  }

}
