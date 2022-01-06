import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Escenario } from 'src/app/model/Escenario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaInicioExpertoService {

  constructor(private http:HttpClient) { }

  recuperarInformacionDeEscenario(numeroEjercitario: number){
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<any>(environment.WS_PATH+"obtenerEscenario", {"numeroEjercitario":numeroEjercitario}, config).toPromise();
  }
}
