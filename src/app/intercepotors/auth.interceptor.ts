import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _router: Router,private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addHeaders(request);

    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log('interceptor error', error);

        if (error.status === 401) {
          this._authService.logout();
          this._router.navigate(['/login']);
          return next.handle(request);
        }
        return next.handle(request);
      })
    );
  }

  addHeaders(request: HttpRequest<any>) {
    let token_acces = this._authService.getToken;
    return request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: token_acces ? 'bearer ' + token_acces : '',
      },
    });
  }
}
