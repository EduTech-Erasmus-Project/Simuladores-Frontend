import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    return this.http.post<any>(environment.WS_PATH+"obtenerAsignacionesEjercitariosDeParticipante", {"correo":correo}, config)
  }
}
