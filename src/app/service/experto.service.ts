import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpertoService {

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
}

