import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationService,
  MessageService,
  SelectItemGroup,
} from "primeng/api";
import { User } from "src/app/core/interfaces/User";
import { AuthService } from "src/app/service/auth.service";
import { InformacionEvaluadorService } from "src/app/service/informcionEvaluador/informacion-evaluador.service";
import { InformacionParticipanteService } from "src/app/service/informcionParticpante/informacion-participante.service";

@Component({
  selector: "app-datos-usuario",
  templateUrl: "./datos-usuario.component.html",
  styles: [
    `
      :host ::ng-deep .p-multiselect {
        min-width: 15rem;
      }

      :host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
        min-width: 20rem;
      }

      :host ::ng-deep .multiselect-custom .p-multiselect-label {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }

      :host ::ng-deep .multiselect-custom .country-item.country-item-value {
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: 0.5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);
      }

      :host
        ::ng-deep
        .multiselect-custom
        .country-item.country-item-value
        img.flag {
        width: 17px;
      }

      :host ::ng-deep .multiselect-custom .country-item {
        display: flex;
        align-items: center;
      }

      :host ::ng-deep .multiselect-custom .country-item img.flag {
        width: 18px;
        margin-right: 0.5rem;
      }

      :host ::ng-deep .multiselect-custom .country-placeholder {
        padding: 0.25rem;
      }

      :host ::ng-deep .p-colorpicker {
        width: 2.5em;
      }
    `,
  ],
})
export class DatosUsuarioComponent implements OnInit {
  public groupedCities: SelectItemGroup[];
  public selectedCities4: any[];
  private correoParticanteDatos: string = "";
  public participante: User;

  public password: string;
  public newPassword: string;
  public repPassword: string;
  public isFormValid = false;
  public areCredentialsInvalid = false;
  public passwordIncorrect = false;
  public passwordRepetida = false;
  public nombreParticipante: string;
  public direccionParticipante: string;
  public carreraParticipante: string;
  public estudiosParticipante: string;
  public apellidoParticipante: string;
  public telefonoParticipante: string;
  public codigoParticipante: string;
  public estadoCivilParticipante: string;
  public paisParticipante: string = "-------------";
  public ciudadParticipante: string = "-------------";

  buttonMostrar: string = "Mostrar";
  buttonMostrarNuevo: string = "Mostrar";
  buttonMostrarRep: string = "Mostrar";
  validatePasswd = false;

  constructor(
    private autentificacionUsuario: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private evaluadorService: InformacionEvaluadorService,
    private usuarioService: InformacionParticipanteService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("correo") != null) {
      if (
        this._Activatedroute.snapshot.paramMap.get("correo") ==
        this.autentificacionUsuario.emailUser
      ) {
        this.correoParticanteDatos =
          this._Activatedroute.snapshot.paramMap.get("correo");
      } else {
        this.autentificacionUsuario.logout();
      }
    } else if (this.autentificacionUsuario.emailUser != null) {
      this.correoParticanteDatos = this.autentificacionUsuario.emailUser;
    } else {
      this.correoParticanteDatos =
        this.autentificacionUsuario.getcorreoPorToken(
          this.autentificacionUsuario.getToken
        );
    }
    console.log("email", this.correoParticanteDatos);
    this.obtenerInformacionUsuario();
  }

  obtenerInformacionUsuario() {
    this.usuarioService
      .obtenerInformacionUsuario(this.correoParticanteDatos)
      .subscribe((usuario: any) => {
        console.log(usuario);
        this.participante = usuario;
        //this.getInformacionUsuario(usuario);
        var evaluador: User;

       

        this.nombreParticipante = usuario?.getNombre;
        this.direccionParticipante = usuario.getDireccion;
        this.carreraParticipante = usuario.getCarreraUniversitaria;
        this.estudiosParticipante = usuario.getEstudiosPrevios;
        this.apellidoParticipante = usuario?.getApellido;
        this.telefonoParticipante = usuario.getTelefono;
        this.codigoParticipante = usuario.getCodigoEstudiante;
        this.estadoCivilParticipante = usuario.getEstadoCivil;
        this.paisParticipante = usuario?.getPais;
        this.ciudadParticipante = usuario?.getCiudad;
      });
  }

  getInformacionUsuario(usuario: any) {
    try {
      this.nombreParticipante = this.participante?.nombre;
      this.direccionParticipante = this.participante.direccion;
      this.carreraParticipante = this.participante.carreraUniversitaria;
      this.estudiosParticipante = this.participante.estudiosPrevios;
      this.apellidoParticipante = this.participante?.apellido;
      this.telefonoParticipante = this.participante.telefono;
      this.codigoParticipante = this.participante.codigoEstudiante;
      this.estadoCivilParticipante = this.participante.estadoCivil;
      this.paisParticipante = this.participante?.pais;
      this.ciudadParticipante = this.participante?.ciudad;

      var evaluador: User;

      this.evaluadorService
        .obtenerInformacionEvaluador(usuario.responsable)
        .subscribe((responsable) => {
          evaluador = responsable;
          this.participante = usuario;
          this.participante.responsable = evaluador;
        });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      this.passwordIncorrect = false;
      return;
    }
    this.verificarPassword();
  }

  verificarPassword() {
    if (this.newPassword != this.repPassword) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
      this.passwordIncorrect = false;
      return;
    }

    if (this.password == this.newPassword) {
      this.isFormValid = false;
      this.areCredentialsInvalid = false;
      this.passwordIncorrect = false;
      this.passwordRepetida = true;
      return;
    }

    this.usuarioService
      .cambiarPassword(
        this.correoParticanteDatos,
        this.password,
        this.newPassword
      )
      .subscribe(
        (res) => {
          console.log("valores: " + res.change);
          if (res.change == "ok") {
            this.router.navigate(["login"]);
            return;
          }
        },
        (error) => {
          this.isFormValid = false;
          this.areCredentialsInvalid = false;
          this.passwordIncorrect = true;
          return;
        }
      );
  }

  eliminarCuenta() {
    this.confirmationService.confirm({
      key: "eliminarCuenta",
      message: "¿Esta seguro de eliminar tu cuenta?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          key: "eliminarTOAST",
          severity: "success",
          summary: "Cuenta Eliminada",
          detail: "La cuenta a sido Eliminada de manera satisfactoria",
        });
        this.usuarioService.eliminarCuenta(
          this.correoParticanteDatos,
          this.participante.password
        );
        this.router.navigate(["login"]);
      },
      reject: () => {
        this.messageService.add({
          key: "eliminarTOAST",
          severity: "error",
          summary: "Acción Cancelada",
          detail: "La acción no se llevo a cabo",
        });
      },
    });
  }

  editarCuenta() {
    this.confirmationService.confirm({
      key: "editarCuenta",
      message: "¿Esta seguro de eliminar tu cuenta?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.participante.nombre = this.nombreParticipante;
        this.participante.direccion = this.direccionParticipante;
        this.participante.carreraUniversitaria = this.carreraParticipante;
        this.participante.estudiosPrevios = this.estudiosParticipante;
        this.participante.apellido = this.apellidoParticipante;
        this.participante.telefono = this.telefonoParticipante;
        this.participante.codigoEstudiante = this.codigoParticipante;
        this.participante.estadoCivil = this.estadoCivilParticipante;
        this.participante.pais = this.paisParticipante;
        this.participante.ciudad = this.ciudadParticipante;
        this.usuarioService.editarCuenta(this.participante);
        this.messageService.add({
          key: "editarTOAST",
          severity: "success",
          summary: "Cuenta Actualizada",
          detail: "La cuenta a sido actualizada de manera satisfactoria",
        });
      },
      reject: () => {
        this.messageService.add({
          key: "editarTOAST",
          severity: "error",
          summary: "Acción Cancelada",
          detail: "La acción no se llevo a cabo",
        });
      },
    });
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

  mostrarPasswordNUeva() {
    if (this.buttonMostrarNuevo == "Ocultar") {
      const p = document.getElementById("newPassword") as HTMLInputElement;
      const b = document.getElementById(
        "buttonMostrarNuevo"
      ) as HTMLInputElement;
      p.type = "password";
      b.textContent = "Mostrar";
      this.buttonMostrarNuevo = "Mostrar";
      return;
    }
    if (this.buttonMostrarNuevo == "Mostrar") {
      const p = document.getElementById("newPassword") as HTMLInputElement;
      const b = document.getElementById(
        "buttonMostrarNuevo"
      ) as HTMLInputElement;
      p.type = "text";
      b.textContent = "Ocultar";
      this.buttonMostrarNuevo = "Ocultar";
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

    if (strongRegex.test(this.newPassword)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "green";
      p.textContent = "Contraseña Fuerte";
      this.validatePasswd = true;
    } else if (mediumRegex.test(this.newPassword)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "orange";
      p.textContent = "Contraseña Normal";
      this.validatePasswd = true;
    } else {
      const p = document.getElementById("tipoPassword");
      p.style.color = "#ce7483";
      p.textContent = "Contraseña Debil";
      this.validatePasswd = false;
    }
  }

  verificacionSimilaridadPassword() {
    if (this.newPassword != this.repPassword) {
      this.passwordIncorrect = true;
      return;
    } else {
      this.passwordIncorrect = false;
    }
  }

  mostrarPasswordRepeticion() {
    if (this.buttonMostrarRep == "Ocultar") {
      const p = document.getElementById("repPassword") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarRep") as HTMLInputElement;
      p.type = "password";
      b.textContent = "Mostrar";
      this.buttonMostrarRep = "Mostrar";
      return;
    }
    if (this.buttonMostrarRep == "Mostrar") {
      const p = document.getElementById("repPassword") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarRep") as HTMLInputElement;
      p.type = "text";
      b.textContent = "Ocultar";
      this.buttonMostrarRep = "Ocultar";
      return;
    }
  }
}
