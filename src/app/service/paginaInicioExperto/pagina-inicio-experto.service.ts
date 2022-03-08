import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escenario, EscenarioInterface, informacionEjercitarioInterface } from 'src/app/model/Escenario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaInicioExpertoService {

  private escenario :  Escenario;
  
  private  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http:HttpClient) { }

  recuperarInformacionDeEscenario(numeroEjercitario: number){
    return this.http.get<any>(environment.WS_PATH+"getEjercitarioNumeroDeEjercitario/"+numeroEjercitario, this.config).
    toPromise().then(res =>  res as EscenarioInterface).then(escenario => escenario);
    
  }

  crearGraficaPaginaInicio(correo: string): Observable<any>{
    return this.http.post<any>(environment.WS_PATH+"crearGraficaInicioExpertoTipoDiscapacidadVsNota", {"evaluador": correo}, this.config);
  }

  obtenerDiscapacidades(): Observable<any>{
    return this.http.get<any>(environment.WS_PATH+"obtenerDiscapacidad", this.config);
  }

  obtenerEjercitarios(){
    return this.http.get<any>(environment.WS_PATH+"getEjercitarios/", this.config).
    toPromise().then(res=> res as any[]).then(res =>  res as informacionEjercitarioInterface[]).then(escenario => escenario);;
  }
}
