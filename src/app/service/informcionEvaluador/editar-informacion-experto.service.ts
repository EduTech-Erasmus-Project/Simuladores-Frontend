import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsable } from 'src/app/model/Responsable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditarInformacionExpertoService {

  constructor(private http: HttpClient) { }

  public cambiarPassword(correo: string, password: string, newPassword: string): Observable<any>{
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"changePasswordResponsable", {"correo":correo,"password":password, "newPassword": newPassword}, config)
  }

  public eliminarCuenta(correo: string, password: string){
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"eliminarCuentaResponsable", {"correo":correo, "password":password}, config).subscribe(res => console.log(res))
  }

  public editarCuenta(responsable: Responsable){
    console.log("correo " + responsable.getEmail + " responsable " +responsable.getCiudad)
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"editarCuentaResponsable", {"correo":responsable.getEmail, "responsable":responsable}, config).subscribe(res => console.log(res))
  }
}
