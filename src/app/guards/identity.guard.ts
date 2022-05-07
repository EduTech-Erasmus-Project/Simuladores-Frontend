import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class IdentityGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate() {
    if (this._authService.user) {
      this._router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
