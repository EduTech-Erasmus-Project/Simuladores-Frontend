import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadInterface } from 'src/app/model/Actividad';
import { AsignacionTabla } from 'src/app/model/Asignacion';
import { Comentario, ComentarioInterface } from 'src/app/model/Comentario';
import { DiscapacidadParticipanteInterface } from 'src/app/model/DiscapacidadParticipante';
import { ExperienciaLaboralInterface } from 'src/app/model/ExperienciaLaboral';
import { Participante, ParticipanteAceptacionTabla } from 'src/app/model/Participante';
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

  public editarCuenta(participante: Participante){
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"editarCuenta", {"correo":participante.getEmail, "participante":participante}, config)
  }
  
  public obtenerInformacionActividadesParticipantes(correo: string){
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.get<any>(environment.WS_PATH+"informacionActividadesParticipante/"+correo, config)
    .toPromise()
    .then(res => res.actividades as AsignacionTabla[])
    .then(actividades => actividades);
   
  }

  public obtenerExperienciaLaboralUsuario(correo: string){
    const config = { 
                      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
                    };
    return (this.http.get<any>(environment.WS_PATH+"getExperienciaLaboralParticipante/"+correo, config))
    .toPromise()
    .then(res => res.experienciaLaboral as ExperienciaLaboralInterface[])
    .then(experiencia => experiencia);
  }

  public obtenerDiscapacidadesDelParticipante(correo: string){
    const config = { 
                      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
                    };
    return (this.http.get<any>(environment.WS_PATH+"getDiscapacidadesDelParticipante/"+correo, config))
    .toPromise()
    .then(res => res.discapacidadesParticipante as DiscapacidadParticipanteInterface[])
    .then(discapacidad => discapacidad);
  }
  
  public recuperarParticipantesIntentosEjercitario(correo: string, ejercitario: number){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"getParticipantesIntentosEjercitario/"+correo+"/"+ejercitario, config))
    .toPromise()
    .then(res => res.actividades as ActividadInterface[])
    .then(actividad => actividad);
  }

  public obtenerComentariosActividadRealizada(idActividad: number){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return (this.http.get<any>(environment.WS_PATH+"getComentariosActividadRealizada/"+idActividad, config))
    .toPromise()
    .then(res => res.comentarios as ComentarioInterface[])
    .then(comentario => comentario);
  }

  public agregarNuevoComentarioActividadParticipante(comentario: Comentario){
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return this.http.post<any>(environment.WS_PATH+"agregarNuevoComentarioActividadParticipante", {"comentario": comentario.getComentario, "fecha": comentario.getFecha, "actividad":comentario.getActividad.idActividad}, config).toPromise();
  }

  public registrarNuevoParticipante(participante: ParticipanteAceptacionTabla): Observable<any>{
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return this.http.post<any>(environment.WS_PATH+"registrarParticipante", participante, config);
  }

  public registrarDiscapacidadParticipante(discapacidad: string, porcentaje: number, correo: string): Observable<any>{
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return this.http.post<any>(environment.WS_PATH+"registrarDiscapacidad", {"discapacidad":discapacidad,"porcentaje":porcentaje,"correo":correo}, config);
  }

  public registrarExperienciaLaboralParticipante(sectorEconomicoParticipante: string, areaLaboralParticipante: string, experienciaAniosParticipante: number, emailParticipante: string): Observable<any>{
    const config = { 
      headers: new HttpHeaders({'Content-Type':  'application/json',}) 
    };
    return this.http.post<any>(environment.WS_PATH+"registrarExperienciaLaboral", {"sectorEconomico":sectorEconomicoParticipante,"areaLaboral":areaLaboralParticipante,"experienciaAnios":experienciaAniosParticipante,"correo":emailParticipante}, config);
  }


  
  
}
