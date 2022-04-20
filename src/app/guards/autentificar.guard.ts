import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacionUsuarioService } from '../service/autentificacion/autentificacion-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutentificarGuard implements CanActivate {

  constructor(private autentificasionService: AutentificacionUsuarioService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.autentificasionService.isLoggedIn()) {
      this.autentificasionService.refreshToken();
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
