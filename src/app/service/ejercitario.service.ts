import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Ejercitario } from '../core/interfaces/Ejercitario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EjercitarioService {

  private evt$: EventEmitter<boolean> = new EventEmitter();

  get: any;

 

  constructor(private http: HttpClient) { }

  public async actualizarArchivo(archivo: File) {
    
     
      const formData = new FormData();
      formData.append('image', archivo);
  }

  
  obtenerTotalEjercitarios() {
    return this.http.get<any>(
      environment.WS_PATH + "getTotalEjercitarios/"
    );
  }

  informacionCount() {
    return this.http.get<any>(
      environment.WS_PATH + "informacionCount/"
    );
  }
  obtenerListaejercitario() {
    return this.http.get<any>(
      environment.WS_PATH + "listaEjercitario/"
    );
  }





  obtenerEjercitario(id: number) {
    return this.http.get<any>(
      environment.WS_PATH + "recuperarEjercitario/" + id
    );
  }

  editarEjercitario(ejercitario: Ejercitario) {
    return this.http.put(environment.WS_PATH + "editarEjercitario/", ejercitario
    );
  }

  registroEjercitario(data:any){
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("nombreDeEjercitario", data.nombreDeEjercitario);
    formData.append("categoria", data.categoria);
    formData.append("tipoDeEjercitario", data.tipoDeEjercitario);
    formData.append("duracion", data.duracion);
    formData.append("sector", data.sector);
    formData.append("urlEjercitario", data.urlEjercitario);
    formData.append("nivel", data.nivel);
    formData.append("competencia", data.competencia);
    formData.append("instruccionPrincipalEjercitario", data.instruccionPrincipalEjercitario);
    formData.append("instruccionesParticipantes", data.instruccionesParticipantes);
    formData.append("variaciones", data.variaciones);
    return this.http.post(environment.WS_PATH + "registroEjercitario/", formData,{
      reportProgress:true,
      observe:"events",
      responseType:"json"
    }
    );
    
  }


  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event() {
    return this.evt$;
  }


}
