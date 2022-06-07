import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MenuItem, Message } from "primeng/api";
import { Clipboard } from "@angular/cdk/clipboard";
import { AuthService } from "src/app/service/auth.service";
import { UsuarioService } from "src/app/service/usuario.service";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-user-password",
  templateUrl: "./user-password.component.html",
  styleUrls: ["./user-password.component.scss"],
})
export class UserPasswordComponent implements OnInit, OnDestroy {
  @ViewChild("inputFile") inputFile: ElementRef;
  public formPassword?: FormGroup;
  public items: MenuItem[];
  public msg: Message[];
  private _subscriptions: Subscription[] = [];

  public fileImage: File;
  public urlImageLocal: any;
  public imageSatusErr: boolean = false;
  public imageUpload: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    this.formPassword = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, this.validateRepitPass()]],
      passwordConfirm: [null, [Validators.required, this.validateRepitPass()]],
    });

    this.items = [
      {
        label: "Copiar",
        icon: "pi pi-copy",
        command: () => {
          this.copy();
        },
      },
    ];
    if (authService.user.tipoUser === "evaluador") {
      this.items.push({
        label: "Copiar link",
        icon: "pi pi-copy",
        command: () => {
          this.copyLink();
        },
      });
    }
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private validateRepitPass(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let newPass = this.formPassword?.get("newPassword").value;
      let confirmPass = this.formPassword?.get("passwordConfirm").value;

      if(!newPass && !confirmPass) return null;

      if (newPass != confirmPass) {
        return { notSame: { value: control.value } };
      }
      
      this.formPassword?.get("newPassword").setErrors(null);
      this.formPassword?.get("passwordConfirm").setErrors(null);
      return null;
    };
  }

  get user() {
    return this.authService.user;
  }

  set user(user) {
    this.authService.user = user;
  }

  copy() {
    this.clipboard.copy(this.authService.user.codigo);
  }

  copyLink() {
    this.clipboard.copy(
      `${environment.HOST}/register?code=${this.authService.user.codigo}`
    );
  }

  ngOnInit(): void {}

  getErrorRequiredPass(field: string) {
    return (
      this.formPassword.get(field).hasError("required") &&
      this.formPassword.get(field).touched
    );
  }

  getErrorNotSame(field:string) {
    return (
      this.formPassword.get(field).hasError("notSame") &&
      this.formPassword.get(field).touched
    );
  }

  async onSubmitPassword() {
    this.markTouchFormPassword();
    if (this.formPassword.valid) {
      //console.log("Form submit");
      this.msg = [];
      let sub = this.usuarioService
        .actualizarPassword(this.formPassword.value)
        .subscribe(
          (res) => {
            this.formPassword.reset();
            this.msg = [
              {
                severity: "success",
                detail: "Contraseña actualizada correctamente",
              },
            ];
          },
          (error) => {
            if (error.error.code === "old_password_no_valid") {
              this.msg = [
                {
                  severity: "error",
                  detail: "Su contraseña actual no coincide con la registrada",
                },
              ];
              return;
            }
            this.msg = [
              {
                severity: "error",
                detail: "Error al actualizar la contraseña",
              },
            ];
          }
        );
      this._subscriptions.push(sub);
    }
  }

  private markTouchFormPassword() {
    (<any>Object).values(this.formPassword.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  onChangePicture(event: any) {
    this.fileImage = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.urlImageLocal = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    //console.log("on change picture", this.urlImageLocal);
  }

  onEnterFigure() {
    this.inputFile.nativeElement.click();
  }

  async onLoadImage() {
    //console.log("Load image");
    this.msg = [];
    this.imageUpload = true;
    await this.usuarioService.updateImage(this.fileImage).subscribe(
      (res: any) => {
        
        this.msg = [
          {
            severity: "success",
            detail: "La foto de perfil se ah cambiado con éxito",
          },
        ];
        
        this.user = res.user;
        //this.loginService.currentUser = this.user;

        //console.log(this.user);

        this.imageSatusErr = false;
        this.imageUpload = false;
        this.fileImage = null;
        this.urlImageLocal = null;
      },
      (err) => {
        //console.log(err);
        this.msg = [
          {
            severity: "error",
            detail: "Error al cambiar la foto de perfil",
          },
        ];
        this.imageSatusErr = true;
        this.imageUpload = false;
      }
    );
  }
}
