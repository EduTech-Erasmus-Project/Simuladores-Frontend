import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http: HttpClient) { }

  recuperarActividadesDeParticipante(idEjercitario:number, idParticipante:number): Observable<any> {
    return this.http.get<any>(`${environment.WS_PATH}getActividadesParticipante/${idEjercitario}/${idParticipante}`);
  }


  getParticipanteActividades(idEjercitario:number){
    return this.http.get<any>(`${environment.WS_PATH}getActividades/${idEjercitario}`);
  }

  getActividad(idActividad:number){
    return this.http.get<any>(`${environment.WS_PATH}getActividad/${idActividad}`);
  }
}
