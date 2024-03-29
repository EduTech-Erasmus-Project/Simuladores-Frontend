import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,  private router: Router){}
  async canActivate(){
    let promiseLoged = await this._authService
      .isLoged()
      .then(res => res)
      .catch(err => {
        this.router.navigateByUrl('/login');
        return err;
      });
    return promiseLoged as boolean;
  }
  
}
