import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultasParaGraficasService {

  private  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  
  constructor(private http:HttpClient) { }
  
    recuperarListaDeDiscapacidades(){
      return this.http.get<any>(environment.WS_PATH+"obtenerListaDiscapacidades",this.config).toPromise();
    }
   
    recuperarListaDeGenero(){
       return this.http.get<any>(environment.WS_PATH+"obtenerListaGenero", this.config).toPromise();
    }

    recuperarListaDeEscenarios(){
      return this.http.get<any>(environment.WS_PATH+"obtenerListaEscenarios", this.config).toPromise();
    }
    
    recuperarListaDiscapacidadesEscenario(){
      return this.http.get<any>(environment.WS_PATH+"obtenerListaDiscapacidadesEscenario", this.config).toPromise();
    }

    recuperarListaGeneroEscenario(){
      return this.http.get<any>(environment.WS_PATH+"obtenerlistadoGeneroEscenario", this.config).toPromise();
    }

    recuperarL

}
