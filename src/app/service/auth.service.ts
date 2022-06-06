import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { User } from "../core/interfaces/User";
import { catchError, map } from "rxjs/operators";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _url = environment.WS_PATH;
  private _user: User;
  public userEvt: Subject<User>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.userEvt = new Subject();
    //this.verifyToken();
  }

  logout() {}
  

  get getToken(): string {
    return this.storageService.getStorageItem("token");
  }
  getcorreoPorToken(token: string) {
    return null;
  }

  public login(data): Observable<any> {
    //console.log("data", data);
    return this.http.post<any>(this._url + "login", data);
  }

  public register(data: any): Observable<any> {
    return this.http.post<any>(this._url + "registro", data);
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

  public checkRole(role: string) {
    if (this.user) {
      return this.user.tipoUser === role;
    }
    return false;
  }

  // public validateToken(token: string) {
  //   let body = {
  //     token,
  //   };
  //   console.log(this._url);
  //   return this.http.post(`${this._url}token/verify/`, body).pipe(
  //     map((resp: any) => (resp?.detail ? false : true)),
  //     catchError((error) => of(false))
  //   );
  // }

  public isLoged() {
    return new Promise(async (resolve, reject) => {
      let tokenData = this.storageService.getStorageItem("token");
      let current_user: any = this.storageService.getStorageItem("user");
      if (tokenData && current_user) {
        resolve(true);
        // this.tokenService.validateToken(tokenData).subscribe((res) => {
        //   if (res) {
        //     resolve(true);
        //   } else {
        //     reject(false);
        //   }
        // });
      } else {
        reject(false);
      }
    });
  }

  async signOut() {
    await this.http
      .get(this._url + "logout")
      .toPromise()
      .then((res) => {
        this.removeSession();
      });
  }

  public removeSession() {
    this.storageService.removeStorageItem("token");
    this.storageService.removeStorageItem("refresh");
    this.storageService.removeStorageItem("user");
    this.user = null;
    this.router.navigate(["/"]);
  }

  public validateRole(role: string): boolean {
    return this.user?.tipoUser === role;
  }

  public resetPass(data: any) {
    let aux = new FormData();
    aux.append("email", data);

    // console.log("ser", data);
    return this.http.post(this._url + "/request-reset-email/", aux);
  }

  public changePassword(data: FormData, id: number) {
    return this.http
      .put(this._url + `/user/change_password/${id}/`, data)
      .pipe(map((data: any) => data));
  }

  public resetPassToken(data: FormData) {
    return this.http
      .patch(this._url + `/password-reset-complete/`, data)
      .pipe(map((data: any) => data));
  }
}
