import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ExpertoInterface } from "src/app/model/Responsable";
import { AutentificacionUsuarioService } from "src/app/service/autentificacion/autentificacion-usuario.service";
import { InformacionEvaluadorService } from "src/app/service/informcionEvaluador/informacion-evaluador.service";

@Component({
  selector: "app-register-experto",
  templateUrl: "./register-experto.component.html",
  styleUrls: ["./register-experto.component.scss"],
})
export class RegisterExpertoComponent implements OnInit {
  //Varibles para el formulario
  nombreExperto: string = "";
  apellidoExperto: string = "";
  telefonoExperto: string = "";
  paisExperto: string = "";
  ciudadExperto: string = "";
  direccionExperto: string = "";
  nivelFormacionExperto: string = "";
  emailExperto: string = "";
  passwordExperto: string = "";
  passwordVerificacionExperto: string = "";

  //control de formulario
  isFormValid = false;
  areCredentialsInvalid = false;
  validatePasswd = false;
  passwordIncorrect: boolean;
  buttonMostrar: string = "Mostrar";
  buttonMostrarVerificacion: string = "Mostrar";
  checkCorreo = false;
  usuarioRegistrado = false;
  experto: ExpertoInterface;

  constructor(
    private autentificacionService: AutentificacionUsuarioService,
    private informacionExperto: InformacionEvaluadorService
  ) {}

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.validadCorreo();
  }

  validadCorreo() {
    this.autentificacionService
      .checkEmail(this.emailExperto)
      .subscribe((res) => {
        if (res.tipoUsuario == "notExist") {
          this.validarPassword();
          return;
        }
        this.areCredentialsInvalid = true;
        return;
      });
  }

  checkRegexCorreo() {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (regex.test(this.emailExperto)) {
      this.checkCorreo = false;
      return;
    } else {
      this.checkCorreo = true;
      return;
    }
  }

  validarPassword() {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    var mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (strongRegex.test(this.passwordExperto)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "green";
      p.textContent = "Contraseña Fuerte";
      this.validatePasswd = true;
      this.verificacionDePasswordsIguales();
    } else if (mediumRegex.test(this.passwordExperto)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "orange";
      p.textContent = "Contraseña Normal";
      this.validatePasswd = true;
      this.verificacionDePasswordsIguales();
    } else {
      const p = document.getElementById("tipoPassword");
      p.style.color = "#ce7483";
      p.textContent = "Contraseña Debil";
      this.validatePasswd = false;
    }
  }

  verificacionDePasswordsIguales() {
    if (this.passwordExperto != this.passwordVerificacionExperto) {
      this.passwordIncorrect = true;
      return;
    }
    this.crearNuevoExperto();
  }

  verificacionSimilaridadPassword() {
    if (this.passwordExperto != this.passwordVerificacionExperto) {
      this.passwordIncorrect = true;
      return;
    } else {
      this.passwordIncorrect = false;
    }
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

  mostrarPasswordVerificacion() {
    if (this.buttonMostrarVerificacion == "Ocultar") {
      const p = document.getElementById(
        "passwordVerificacion"
      ) as HTMLInputElement;
      const b = document.getElementById(
        "buttonMostrarVerificacion"
      ) as HTMLInputElement;
      p.type = "password";
      b.textContent = "Mostrar";
      this.buttonMostrarVerificacion = "Mostrar";
      return;
    }
    if (this.buttonMostrarVerificacion == "Mostrar") {
      const p = document.getElementById(
        "passwordVerificacion"
      ) as HTMLInputElement;
      const b = document.getElementById(
        "buttonMostrarVerificacion"
      ) as HTMLInputElement;
      p.type = "text";
      b.textContent = "Ocultar";
      this.buttonMostrarVerificacion = "Ocultar";
      return;
    }
  }

  crearNuevoExperto() {
    this.experto = {
      email: this.emailExperto,
      password: this.passwordExperto,
      nombre: this.nombreExperto,
      apellido: this.apellidoExperto,
      telefono: this.telefonoExperto,
      pais: this.paisExperto,
      ciudad: this.ciudadExperto,
      direccion: this.direccionExperto,
      estado: "activo",
      nivelDeFormacion: this.nivelFormacionExperto,
    };
    this.informacionExperto
      .registrarNuevoExperto(this.experto)
      .subscribe((res) => {
        if (res.status == "registrado") {
          this.usuarioRegistrado = true;
          return;
        }
      });
  }
}
