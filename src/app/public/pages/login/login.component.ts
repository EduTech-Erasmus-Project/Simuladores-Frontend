import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/app/model/Usuario";
import { AutentificacionUsuarioService } from "src/app/service/autentificacion/autentificacion-usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  dark: boolean;
  checked: boolean;
  public showPassword: boolean;
  isFormValid = false;
  areCredentialsInvalid = false;
  username: string = "";
  password: string = "";
  buttonMostrar: string = "Mostrar";

  constructor(
    private autentificacionService: AutentificacionUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    //check existencia de correo

    this.autentificacionService.checkEmail(this.username).subscribe(
      (responseAut) => {
        if (
          responseAut.tipoUsuario != "notExist" &&
          responseAut.tipoUsuario != ""
        ) {
          const userData = new Usuario(this.username, this.password);
          this.autentificacionService.checkCredencialesLogin(
            userData,
            responseAut.tipoUsuario
          );
        } else {
          this.isFormValid = false;
          this.areCredentialsInvalid = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    /*const userData = new Usuario(this.username, this.password);
    
    if (!this.autentificacionService.autentificacionUsuario(userData)) {
      
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }*/
  }

  mostrarPassword() {
    if (this.buttonMostrar == "Ocultar") {
      const p = document.getElementById("password") as HTMLInputElement;
      const b = document.getElementById("buttonMostrar") as HTMLInputElement;
      p.type = "password";
      b.textContent = "Mostrar";
      this.buttonMostrar = "Mostrar";
      return;
    }
    if (this.buttonMostrar == "Mostrar") {
      const p = document.getElementById("password") as HTMLInputElement;
      const b = document.getElementById("buttonMostrar") as HTMLInputElement;
      p.type = "text";
      b.textContent = "Ocultar";
      this.buttonMostrar = "Ocultar";
      return;
    }
  }
}
