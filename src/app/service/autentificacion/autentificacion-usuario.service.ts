import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionUsuarioService {

  private readonly mockUser: Usuario = new Usuario('test', 'test5665');
  isAuthenticated = false;


  constructor(private router: Router) { }

  autentificacionUsuario(userData: Usuario): boolean {
    
    if (this.checkCredenciales(userData)) {
      this.isAuthenticated = true;
      console.log('Hemos entrado a: Pagina-Principal-Usuario');
      this.router.navigate(['Pagina-Principal-Usuario']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredenciales(userData: Usuario): boolean{
    return this.checkCorreo(userData.getCorreo()) && this.checkPassword(userData.getPassword());
  }

  private checkCorreo(correo: string): boolean {
    return correo === this.mockUser.getCorreo();
    
  }

  private checkPassword(password: string): boolean {
    return password === this.mockUser.getPassword();
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
