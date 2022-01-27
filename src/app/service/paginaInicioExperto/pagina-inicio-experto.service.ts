import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escenario } from 'src/app/model/Escenario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaInicioExpertoService {

  private readonly  escenario :  Escenario = new Escenario();
  
  private  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http:HttpClient) { }

  recuperarInformacionDeEscenario(numeroEjercitario: number): Escenario{
    this.http.post<any>(environment.WS_PATH+"obtenerEscenario", {"numeroEjercitario":numeroEjercitario}, this.config).
    toPromise().then(res => {
        this.escenario.setNombreDeEjercitario = res.nombreDeEjercitario;
        this.escenario.setTipoDeEjercitario = res.tipoDeEjercitario;
        this.escenario.setInstruccionPrincipalEjercitario = res.instruccionPrincipalEjercitario;
        this.escenario.setPrincipalCompetenciasEjercitario = res.principalCompetenciasEjercitario;
        this.escenario.setDuracionEjercitarioPorMinutos = res.duracionEjercitarioPorMinutos;
        this.escenario.setUrlEjercitarios = res.urlEjercitarios;
      }
    )
    return this.escenario;

  }

  crearGraficaPaginaInicio(correo: string): Observable<any>{
    return this.http.post<any>(environment.WS_PATH+"crearGraficaInicioExpertoTipoDiscapacidadVsNota", {"evaluador": correo}, this.config);
  }

  obtenerDiscapacidades(): Observable<any>{
    return this.http.get<any>(environment.WS_PATH+"obtenerDiscapacidad", this.config);
  }
}
