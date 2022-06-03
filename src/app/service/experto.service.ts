import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertoService {
  private evt$: EventEmitter<boolean> = new EventEmitter();

  constructor(private http:HttpClient) { }


  obtenerExpertosPendientes() {
    return this.http.get<any>(environment.WS_PATH + "evaluadorTotalPendientes/");
  }

  obtenerExpertosRechazados() {
    return this.http.get<any>(environment.WS_PATH + "evaluadorTotalRechazados/");
  }

  obtenerExpertosAprobados() {
    return this.http.get<any>(environment.WS_PATH + "evaluadorTotalAprobados/");
  }

  aprobarEvaluador(data): Observable<any> {
    return this.http.post<any>(environment.WS_PATH + "aprobarEvaluador/",data);
  }
  
  public obtenerInformacionEvaluador(id: number): Observable<any> {
    return this.http.get<any>(environment.WS_PATH + "getUsuarioEvaluador/" + id);
  }

  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event(){
    return this.evt$;
  }
}

