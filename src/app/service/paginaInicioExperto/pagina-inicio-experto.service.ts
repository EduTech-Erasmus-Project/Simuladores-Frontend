import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Asignacion } from "src/app/core/interfaces/Asignacion";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaginaInicioExpertoService {
  private escenario: Asignacion;

  private config = {
    headers: new HttpHeaders().set("Content-Type", "application/json"),
  };

  constructor(private http: HttpClient) {}

  recuperarInformacionDeEscenario(numeroEjercitario: number) {
    return this.http.get<any>(
      environment.WS_PATH +
        "getEjercitarioNumeroDeEjercitario/" +
        numeroEjercitario,
      this.config
    );
  }

  crearGraficaPaginaInicio(correo: string): Observable<any> {
    return this.http.post<any>(
      environment.WS_PATH + "crearGraficaInicioExpertoTipoDiscapacidadVsNota",
      { evaluador: correo },
      this.config
    );
  }

  

  
}
