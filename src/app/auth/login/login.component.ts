import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Message, MessageService } from "primeng/api";
import { LanguageService } from "src/app/service/language.service";

import { StorageService } from "src/app/service/storage.service";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  //dark: boolean=false;
  public checked: boolean;
  public translate: TranslateService;
  public msjError;
  private subscribes: Subscription[] = [];
  private msj: string;
  public show: boolean = false;

  public msgs: Message[];

  //public formSubmit: false;

  public loginForm = this.fb.group({
    email: [
      this.storageService.getStorageItem("userEmail") || null,
      [
        Validators.required,
        Validators.pattern(
          "^([a-zA-Z0-9_'-'.]+)@([a-zA-Z0-9_'-'.]+).([a-zA-Z]{2,5})$"
        ),
      ],
    ],
    password: [null, [Validators.required]],
    rememberMe: [!!this.storageService.getStorageItem("userEmail")],
  });

  // dartActive(dart_active: boolean):boolean{
  //   this.dark = dart_active;
  //   localStorage.setItem('dart_active',dart_active.toString());
  //   return this.dark;
  // }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    //this.dark = localStorage.getItem('dart_active')==='true'?true:false;
  }
  ngOnDestroy(): void {
    //console.log("unsuscribe")

    this.subscribes.forEach((sub) => {
      sub.unsubscribe;
    });
  }

  ngOnInit(): void {}

  get errorEmailRequired(): boolean {
    //console.log(this.loginForm.get('email'))
    return (
      this.loginForm.get("email").errors?.required &&
      this.loginForm.get("email").touched
    );
  }
  get errorEmailFormat(): boolean {
    return (
      this.loginForm.get("email").errors?.pattern &&
      this.loginForm.get("email").touched
    );
  }
  get errorPasswordRequired(): boolean {
    return (
      this.loginForm.get("password").errors?.required &&
      this.loginForm.get("password").touched
    );
  }

  async onLogin() {
    this.msgs = [];
    this.markTouchForm();

    if (this.loginForm.valid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "info",
        text: this.msj,
      });
      Swal.showLoading();

      let formData = {
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value,
      };

      let loginSub = await this.authService.login(formData).subscribe(
        async (res: any) => {
          Swal.close();
          //console.log(res);
          this.storageService.saveStorageItem("token", res.token_access);
          this.storageService.saveStorageItem("refresh", res.token_refresh);

          //this.authService.emailUser = res.user.email;
          this.authService.user = res.user;

          if (res.user.tipoUser === "evaluador") {
            this.router.navigate(["/expert"]);
            return;
          } else if (res.user.tipoUser === "admin") {
            this.router.navigate(["/dashboard"]);
            return;
          }
          this.router.navigate(["/user"]);
          return;
        },
        (error) => {
          Swal.close();
          console.log(error);
          if (error?.error?.code == "user_inactive") {
            this.msgs = [
              {
                severity: "error",
                summary: "Error",
                detail: "Tu cuenta esta desactivada por favor contactate con un administrador.",
              },
            ];
            return;
          }
          if (error?.error?.code == "user_unapproved") {
            this.msgs = [
              {
                severity: "warn",
                detail:error?.error?.razon,
              },
            ];
            return;
          }
          if (error?.error?.code == "user_rejected") {
            this.msgs = [
              {
                severity: "warn",
                summary: "Cuenta desactivada",
                detail: error?.error.razon,
              },
            ];
            return;
          }
          if (error?.error?.code == "user_invalid") {
            this.msgs = [
              {
                severity: "error",
                summary: "Error",
                detail: "Correo o contraseña incorrectos.",
              },
            ];
            return;
          }

          this.msgs = [
            {
              severity: "error",
              summary: "Error",
              detail:
                "Se ha producido un error al iniciar sesión, por favor intente nuevamente.",
            },
          ];
        }
      );

      this.subscribes.push(loginSub);
    }
  }

  markTouchForm() {
    (<any>Object).values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  onSaveEmail(event) {
    if (event.checked) {
      this.saveEmail();
    } else {
      this.storageService.removeStorageItem("userEmail");
    }
  }

  saveEmail() {
    if (
      this.loginForm.get("email").value !== null &&
      this.loginForm.get("email").value !== ""
    ) {
      this.storageService.saveStorageItem(
        "userEmail",
        this.loginForm.get("email").value
      );
    } else {
      this.markTouchForm(); //rememberMe
      this.loginForm.controls["rememberMe"].setValue(false);
    }
  }
}
