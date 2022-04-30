import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import * as moment from "moment";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { User } from "../core/interfaces/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // the actual JWT token
  public token: string;
  // the token expiration date
  public token_expires: Date;
  // the token created date
  public token_created: Date;
  // the email of the logged in user
  private _emailUser: string;
  // the tipo of the logged in user
  public typeUser: string;
  // error messages received from the login attempt
  public errors: any = [];
  private _url = environment.WS_PATH;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public login(data): Observable<any> {
    return this.http.post<any>(this._url + "login", data);
  }

  public register(data: any): Observable<any> {
    return this.http.post<any>(this._url + "registro", data);
  }

  // public logout(): Observable<any> {
  //   return this.http.post<any>(this._url + 'logout', {});
  // }

  public get emailUser(): string {
    if (this._emailUser) {
      return this._emailUser;
    } else {
      let user: any = this.storageService.getStorageItem("user");
      this._emailUser = user.email;
      this.typeUser = user.tipoUser;
      return this._emailUser;
    }
  }

  public set emailUser(email: string) {
    this._emailUser = email;
  }

  public checkEmail(correo: string): Observable<any> {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post<any>(
      environment.WS_PATH + "verficicarCorreo",
      { correo: correo },
      config
    );
  }

  public checkCredencialesLogin(userData: User, tipoUsuario: string) {
    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .post<any>(
        environment.WS_PATH + "loginAcceso",
        {
          correo: userData.email,
          password: userData.password,
          tipoUsuario: tipoUsuario,
        },
        config
      )
      .subscribe(
        (data) => {
          this.updateData(data);
        },
        (err) => {
          this.errors = err["error"];
        }
      );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this._emailUser = null;
    this.token_created = null;
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("token_created");

    const config = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    this.http
      .post<any>(environment.WS_PATH + "logout", config)
      .subscribe((res) => {
        console.log("logout: " + res.message);
        this.router.navigate([""]);
      });
  }

  private updateData(data: any) {
    if (data.login == "true") {
      this.token = data.jwt;
      this.errors = [];
      // decode the token to read the email and expiration timestamp
      const token_parts = this.token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      this.token_expires = new Date(token_decoded.exp * 1000);
      this.token_created = new Date(token_decoded.iat * 1000);
      this._emailUser = token_decoded.email;
      this.typeUser = token_decoded.tipoUser;
      this.setSession();

      if (this.typeUser == "evaluador") {
        this.router.navigate(["Pagina-Principal-Experto/"]);
        return;
      }
      this.router.navigate(["Pagina-Principal-Usuario/"]);
      return;
    } else {
      return;
    }
  }

  private setSession() {
    localStorage.setItem("token", this.token);
    localStorage.setItem(
      "expires_at",
      JSON.stringify(this.token_expires.valueOf())
    );
    localStorage.setItem(
      "token_created",
      JSON.stringify(this.token_created.valueOf())
    );
  }

  get getToken(): string {
    return this.storageService.getStorageItem("token");
  }

  getcorreoPorToken(token: string): string {
    if (token != null) {
      // const token_parts = token.split(/\./);
      // const token_decoded = JSON.parse(window.atob(token_parts[1]));
      // this.token_expires = new Date(token_decoded.exp * 1000);
      // this.token_created = new Date(token_decoded.iat * 1000);
      let user: any = this.storageService.getStorageItem("user");

      this._emailUser = user.email;
      this.typeUser = user.tipoUser;
      return this.emailUser;
    }
  }

  getExpiration() {
    var expiration: string = localStorage.getItem("expires_at");
    const expiresAt = new Date(Number(expiration));
    return expiresAt;
  }

  getCreatedToken() {
    var token_created: string = localStorage.getItem("token_created");
    const token_createdAt = new Date(Number(token_created));
    return token_createdAt;
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  refreshToken() {
    if (moment().isBetween(this.getCreatedToken(), this.getExpiration())) {
      const config = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
      this.http
        .post<any>(
          environment.WS_PATH + "refreshToken",
          { jwt: this.getToken },
          config
        )
        .subscribe(
          (data) => {
            this.updateData(data);
          },
          (err) => {
            this.errors = err["error"];
          }
        );
    }
  }
}
