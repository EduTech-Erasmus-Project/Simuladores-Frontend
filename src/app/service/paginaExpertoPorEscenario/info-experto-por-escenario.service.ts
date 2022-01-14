import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoExpertoPorEscenarioService {

  private  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http:HttpClient) { }

  recuperarListadoNotaPorEscenario(listadoGeneroEscenario: [], listadoDiscapacidadEscenario: [], numEscenario:String){
    
    return this.http.post<any>(environment.WS_PATH+"obtenerNotasPorEscenario", {
      "generoPorEscenario": listadoGeneroEscenario, 
      "discapacidadEscenario": listadoDiscapacidadEscenario,  
      "escenario": numEscenario}, this.config).toPromise();
  }

  recuperarListadoTiempoResolucionCompletaPorEscenario(listaGeneroEscenario: [], listadoDiscapacidadesEscenario: [], numEscenario:String){
    return this.http.post<any>(environment.WS_PATH+"obtenerlistaTiempoResolucionCompletaEscenario", 
    {"generoPorEscenario": listaGeneroEscenario, 
     "discapacidadEscenario": listadoDiscapacidadesEscenario,
     "escenario":numEscenario},this.config).toPromise();  
  
  }

  recuperarListadoTiempoResolucionSoloRespuestaPorEscenario(listaGeneroEscenario: [], listadoDiscapacidadesEscenario:[], numEscenario:String){
    
    return this.http.post<any>(environment.WS_PATH+"obtenerlistadoTiempoResolucionSoloRespuestaEscenario",
    {"generoEscenario":listaGeneroEscenario, 
      "discapacidadEscenario": listadoDiscapacidadesEscenario,
      "escenario": numEscenario}, this.config).toPromise();

  }


}
