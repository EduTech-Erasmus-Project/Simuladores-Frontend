import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscapacidadesService {

  constructor(private http: HttpClient) { }

  obtenerDiscapacidades(): Observable<any>{
    return this.http.get<any>(environment.WS_PATH+"obtenerDiscapacidad");
  }
  obtenerListaDiscapacidades(){
    return this. http.get<any>(environment.WS_PATH + "getParticipantesIntentosEjercitario/");
  }
}
