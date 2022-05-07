import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { User } from "../core/interfaces/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _emailUser: string;
  private _url = environment.WS_PATH;
  private _user: User;
  public userEvt: Subject<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.userEvt = new Subject();
    //this.verifyToken();
  }

  public login(data): Observable<any> {
    return this.http.post<any>(this._url + "login", data);
  }

  public register(data: any): Observable<any> {
    return this.http.post<any>(this._url + "registro", data);
  }

  public get emailUser(): string {
    if (this._emailUser) {
      return this._emailUser;
    } else {
      let user: any = this.storageService.getStorageItem("user");
      this._emailUser = user.email;
      return this._emailUser;
    }
  }

  public set emailUser(email: string) {
    this._emailUser = email;
  }

  public logout() {
    this._emailUser = null;
    this._user = null;

    this.storageService.removeStorageItem("token");
    this.storageService.removeStorageItem("user");

    this.router.navigate(["/"]);
    return;

    // const config = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //   }),
    // };
    // this.http
    //   .post<any>(environment.WS_PATH + "logout", config)
    //   .subscribe((res) => {
    //     console.log("logout: " + res.message);
    //     this.router.navigate(["/"]);
    //   });
  }


  public get getToken(): string {
    return this.storageService.getStorageItem("token");
  }

  public get user(): User | any {
    if (!this._user) {
      this._user = this.storageService.getStorageItem("user") as User;
    }
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
    this.storageService.saveStorageItem("user", user);
    this.userEvt.next(user);
  }

  public getcorreoPorToken(token: string): string {
    if (token != null) {
      let user: any = this.storageService.getStorageItem("user");
      this._emailUser = user.email;
      return this.emailUser;
    }
  }

  public checkRole(role: string) {
    if (this.user) {
      return this.user.tipoUser === role;
    }
    return false;
  }

  public async verifyToken() {
    if (!this.getToken) this.logout();

    try {
      let token = await this.http
        .post<any>(environment.WS_PATH + "verifyToken", { jwt: this.getToken })
        .toPromise();
      if (token.login == "true") {
        //return true;
        this.user = token.user;
      } else {
        this.logout();
      }
    } catch (error) {
      this.logout();
    }
  }

  public get isLogged(): boolean {
    return this.getToken && this.user;
  }
}
