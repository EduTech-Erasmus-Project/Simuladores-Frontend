import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
