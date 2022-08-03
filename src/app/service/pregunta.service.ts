import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Ejercitario } from '../core/interfaces/Ejercitario';
import { Pregunta } from '../core/interfaces/Pregunta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private evt$: EventEmitter<boolean> = new EventEmitter();

  get: any;
  constructor(private http: HttpClient) { }

  registroPregunta(data: any) {
    // let formData = new FormData();
    // formData.append("numeroPregunta", data.numeroPregunta);
    // formData.append("id", data.preguntaDelEjercitario);
    // formData.append("contenido", data.contenido);
    // formData.append("respuestaCorrecta", data.respuestaCorrecta);

    return this.http.post(environment.WS_PATH + "registroPregunta/", data,
      // {
      //   reportProgress: true,
      //   observe: "events",
      //   responseType: "json"
      // }
    );

  }


  public emitEvent(data: boolean) {
    this.evt$.emit(data);
  }

  public get event() {
    return this.evt$;
  }

  obtenerListaPregunta(id: number) {
    return this.http.get<any>(
      environment.WS_PATH + "listaPreguntaEjercitario/" + id
    );
  }
  recuperarPreguntaEjercitario(id: number) {
    return this.http.get<any>(
      environment.WS_PATH + "recuperaPreguntaEjercitario/" + id
    );
  }
  editarPregunta(pregunta: Pregunta) {
    return this.http.put(environment.WS_PATH + "editarPregunta/", pregunta
    );
  }
  eliminarPregunta(id:Number) {
    return this.http.delete(environment.WS_PATH + "eliminarPregunta/"+ id
    );
}
}
