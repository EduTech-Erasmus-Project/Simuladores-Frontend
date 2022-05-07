import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { StorageService } from "./storage.service";
import { TokenService } from "./token.service";
import { map } from "rxjs/operators";

//import { CurrentUser } from "../core/interfaces/CurrentUser";

const baseUrl = environment.WS_PATH;

@Injectable({
  providedIn: "root",
})
export class LoginService {
  //private currUser: CurrentUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private tokenService: TokenService
  ) {
    // this.currUser =
    //   (storageService.getStorageItem("current_user") as CurrentUser) || null;
    //console.log("current currUser", this.currUser)
  }

  set currentUser(currUser: any) {
    //console.log("set current currUser", currUser);
    //this.currUser = currUser;
    //this.storageService.saveStorageItem("current_user", this.currUser as any);
  }
  get user() {
    //return this.currUser;
    return true;
  }

  signIn(formData: any) {
    return this.http.post(baseUrl + "login", formData);
  }

  signOut(): void {
    this.storageService.removeStorageItem("current_user");
    //this.storageService.removeStorageItem('csrftoken');
    this.storageService.removeStorageItem("data_ref");
    this.storageService.removeStorageItem("data_acc");
    //this.currUser = null;
    this.router.navigateByUrl("/");
    // this.router.navigate(["/"]).then(() => {
    //   window.location.reload();
    // });
  }

  validateUser(token: string) {
    // return new Promise(async (resolve, reject) => {
    //   await this.http.get(baseUrl + "/user/").subscribe(
    //     (res: any) => {
    //       //console.log('res', res);
    //       this.storageService.saveStorageItem("current_user", res);
    //       this.currUser = this.storageService.getStorageItem(
    //         "current_user"
    //       ) as CurrentUser;
    //       //console.log("currUser saved", this.currUser);
    //       if (
    //         this.currUser.administrator !== null ||
    //         this.validateRole("superuser")
    //       ) {
    //         //console.log("validate super currUser", this.currUser.roles.includes('superuser'))
    //         this.router.navigate(["admin"]);
    //       } else {
    //         if (this.validateRole("student")) {
    //           this.router.navigate(["recommended"]);
    //         }
    //         if (this.validateRole("teacher")) {
    //           this.router.navigate(["settings/my-objects"]);
    //         }
    //         if (this.validateRole("expert")) {
    //           let extras: NavigationExtras = {
    //             queryParams: {
    //               is_evaluated: "False",
    //             },
    //           };
    //           this.router.navigate(["search"], extras);
    //         }
    //         //this.router.navigate(["/"]);
    //       }

    //       resolve(true);
    //     },
    //     (error) => {
    //       resolve(error);
    //     }
    //   );
    // });
    //return this.http.get(baseUrl + "/currUser/", { headers }); //.pipe(map((data: any) => data)); observe: "response"
  }

  isLoged() {
    return new Promise(async (resolve, reject) => {
      let tokenData = this.storageService.getStorageItem("data_ref");
      let current_user: any = this.storageService.getStorageItem("current_user");
      if (tokenData && current_user) {
        this.tokenService.validateToken(tokenData).subscribe((res) => {
          if (res) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        reject(false);
      }
    });
  }

  validateRole(role: string): boolean {
    // if (this.currUser) {
    //   if (this.currUser.roles?.includes(role)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   false;
    // }
    return true
  }

  signOutPass(): void {
    this.storageService.removeStorageItem("current_user");
    //this.storageService.removeStorageItem('csrftoken');
    this.storageService.removeStorageItem("data_ref");
    this.storageService.removeStorageItem("data_acc");
    //this.currUser = null;
    this.router.navigateByUrl("/login");
    // this.router.navigate(["/"]).then(() => {
    //   window.location.reload();
    // });
  }

  resetPass(data: any) {
    let aux = new FormData();
    aux.append("email", data);

   // console.log("ser", data);
    return this.http.post(baseUrl + "/request-reset-email/", aux);
  }

  changePassword(data: FormData, id: number) {
    return this.http.put(baseUrl + `/user/change_password/${id}/`, data).pipe(map((data: any) => data));
  }

  resetPassToken(data : FormData){
    return this.http.patch(baseUrl+`/password-reset-complete/`,data).pipe(map((data: any) => data));
  }
}
