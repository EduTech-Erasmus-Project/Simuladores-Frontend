import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/model/Participante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformacionParticipanteService {

  constructor(private http: HttpClient) { }

  public obtenerInformacionUsuario(correo: string): Observable<any>{
    const config = { 
                      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
                    };
    return (this.http.get<any>(environment.WS_PATH+"getParticipante/"+correo, config))
  }

  public cambiarPassword(correo: string, password: string, newPassword: string): Observable<any>{
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"changePassword", {"correo":correo,"password":password, "newPassword": newPassword}, config)
  }

  public eliminarCuenta(correo: string, password: string): Observable<any>{
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"eliminarCuenta", {"correo":correo, "password":password}, config)
  }

  public editarCuenta(participante: Participante): Observable<any>{
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"editarCuenta", {"correo":participante.getEmail, "participante": participante}, config)
  }
  

}
