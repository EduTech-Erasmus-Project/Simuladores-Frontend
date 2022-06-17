import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EjercitarioService {

  constructor(private http:HttpClient) { }

  obtenerTotalEjercitarios() {
    return this.http.get<any>(
      environment.WS_PATH + "getTotalEjercitarios/"
    );
  }

  informacionCount(){
    return this.http.get<any>(
      environment.WS_PATH + "informacionCount/"
    );
  }
  obtenerListaejercitario() {
    return this.http.get<any>(
      environment.WS_PATH + "listaEjercitario/"
    );
  }

  
}
