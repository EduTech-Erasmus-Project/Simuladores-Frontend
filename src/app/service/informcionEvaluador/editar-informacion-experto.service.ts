import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/User';
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

  public editarCuenta(responsable: User){
    console.log("correo " + responsable?.email + " responsable " +responsable?.ciudad)
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.put<any>(environment.WS_PATH+"editarCuentaResponsable", {"correo":responsable?.email, "responsable":responsable}, config).subscribe(res => console.log(res))
  }
}
