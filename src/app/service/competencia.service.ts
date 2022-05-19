import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CompetenciaService {
  constructor(private http: HttpClient) {}

  obtenerCompetencias() {
    return this.http.get<any>(environment.WS_PATH + "getCompetencias/");
  }

  obtenerCompetencia(idCompetencia: number) {
    return this.http.get<any>(
      environment.WS_PATH + "getCompetencia/" + idCompetencia
    );
  }
}
