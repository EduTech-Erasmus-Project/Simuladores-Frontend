import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsable } from 'src/app/model/Responsable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformacionEvaluadorService {

  constructor(private http: HttpClient) { }

  public obtenerInformacionEvaluador(id: number): Observable<any>{
    const config = { 
                      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
                    };
    return (this.http.get<any>(environment.WS_PATH+"getEvaluador/"+id, config))
  }

  public obtenerInformacionEvaluadorCorreo(correo: string): Promise<any>{
    const config = { 
                      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
                    };
    return (this.http.get<any>(environment.WS_PATH+"getEvaluador/"+correo, config)).toPromise().then(
      res => res as Responsable).then(responsable => responsable);
  }
}
