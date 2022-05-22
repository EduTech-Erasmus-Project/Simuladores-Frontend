import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Asignacion } from 'src/app/core/interfaces/Asignacion';
import { Escenario } from 'src/app/core/interfaces/Escenario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjercitarioParticipanteService {

  constructor(private router: Router, private http: HttpClient) { }

  public obtenerAsignacionesEjercitario(correo: string): Observable<any>{
    const config = { headers: new HttpHeaders({
                      'Content-Type':  'application/json',}) 
                    };
    return (this.http.post<any>(environment.WS_PATH+"obtenerDiscapacidadesPorEvaluador", {"correo":correo}, config))
  }

  public obtenerEjercitario(id: number): Observable<any>{
    const config = { 
                      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
                    };
    return (this.http.get<any>(environment.WS_PATH+"getEjercitario/"+id, config))
  }

  

  
}
