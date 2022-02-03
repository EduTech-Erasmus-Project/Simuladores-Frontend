import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParticipanteAceptacionTabla } from 'src/app/model/Participante';
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

  public obtenerParticipantesPorAceptarEvaluadorCorreo(correo: string){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"getParticipantesEvaluadorAceptar/"+correo, config)).toPromise().then(res => res.participantesAceptacion as ParticipanteAceptacionTabla[])
      .then(participantesAceptacion => participantesAceptacion);
  }

  public obtenerParticipantesEvaluadorCorreo(correo: string){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"getParticipantesEvaluadorAceptados/"+correo, config)).toPromise().then(res => res.participantes as ParticipanteAceptacionTabla[])
      .then(participantes => participantes);
  }

  

  public agregarParticipante(email: string){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"agregarParticipanteEvaluador/"+email, config)).toPromise().then(res => console.log(res));
  }

  public eliminarParticipante(email: string){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"eliminarParticipanteEvaluador/"+email, config)).toPromise().then(res => console.log(res));

  }

  public recuperarEvaluadoresParaRegistro(){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"getEvaluadores/", config)).toPromise().then(res => res.evaluadores);

  }
}
