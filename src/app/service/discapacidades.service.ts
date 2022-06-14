import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscapacidadesService {
  private evt$: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  obtenerDiscapacidades(): Observable<any>{
    return this.http.get<any>(environment.WS_PATH+"obtenerDiscapacidad");
  }
  obtenerListaDiscapacidades(){
    return this. http.get<any>(environment.WS_PATH + "getParticipantesIntentosEjercitario/");
  }

  listaDiscapacidad(){
    return this. http.get<any>(environment.WS_PATH + "discapacidadListas/");
  }
  
  registrarDiscapacidad(data): Observable<any> {
    return this.http.post<any>(environment.WS_PATH + "regisDiscapacidad/",data);
  }
  public editarDiscapacidad(id: number): Observable<any> {
    return this.http.get<any>(environment.WS_PATH + "editarDiscapacidad/"+ id);
  }

  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event(){
    return this.evt$;
  }
}
