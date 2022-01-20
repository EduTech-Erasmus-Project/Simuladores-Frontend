import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { rejects } from 'assert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionUsuarioService {

  private readonly mockUser: Usuario = new Usuario('test', 'test5665');
  isAuthenticated = false;
  private login = "";
  
  constructor(private router: Router, private http: HttpClient) { }

  public checkEmail(correo: string): Observable<any>{
    const config = { headers: new HttpHeaders({
                      'Content-Type':  'application/json',}) 
                    };
    return this.http.post<any>(environment.WS_PATH+"verficicarCorreo", {"correo":correo}, config)
  }

  public checkCredencialesLogin(userData: Usuario, tipoUsuario: string): Observable<any>{
    const config = { headers: new HttpHeaders({
      'Content-Type':  'application/json',}) 
    };
    return this.http.post<any>(environment.WS_PATH+"loginAcceso", {"correo":userData.getCorreo(),"password":userData.getPassword(), "tipoUsuario": tipoUsuario}, config)
  }


  autentificacionUsuario(userData: Usuario) {
    if (this.login == 'true') {
      this.isAuthenticated = true;
      this.router.navigate(['Pagina-Principal-Usuario']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
