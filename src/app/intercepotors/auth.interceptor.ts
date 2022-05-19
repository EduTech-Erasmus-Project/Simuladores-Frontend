import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { StorageService } from "../service/storage.service";
import { TokenService } from "../service/token.service";
import { AuthService } from "../service/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshAccesToken: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private storageService: StorageService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addHeader(request);

    return next.handle(request).pipe(
      catchError((error: any) => {

        //console.log("error interceptor", error);
        
        if (
          (error instanceof HttpErrorResponse &&
            error.error?.messages &&
            error?.error?.messages[0]?.token_type === "access")
        ) {
          //console.log("error interceptor", error)
          return this.errorUnauthorized(request, next);
        } else if (error.error.code === "token_not_valid") {
          //console.log("error token")
          this.authService.removeSession();
          return;
        } else {
          throw error;
          //return;
        }
      })
    );
  }

  addHeader(request: HttpRequest<any>) {
    let data_acc = this.storageService.getStorageItem("token");
    let data_ref = this.storageService.getStorageItem("refresh");

    return request.clone({
      setHeaders: {
        //"Content-Type": "application/json;",
        Accept: "application/json",
        //"X-Frame-Options": "SAMEORIGIN",
        //"Access-Control-Allow-Headers": "*",
        Authorization: data_acc && data_ref ? `Bearer ${data_acc}` : "",
      },
    });
  }

  errorUnauthorized(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshAccesToken) {
      this.refreshAccesToken = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.refreshToken().pipe(
        switchMap((res: any) => {
          //console.log("token refresh", res)
          this.refreshAccesToken = false;
          this.refreshTokenSubject.next(res.access);
          return next.handle(this.addHeader(request));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((res) => {
          //console.log("token is active", res)
          return next.handle(this.addHeader(request));
        })
      );
    }
  }
}
