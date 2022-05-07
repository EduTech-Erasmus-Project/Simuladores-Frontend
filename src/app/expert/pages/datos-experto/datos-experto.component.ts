import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItemGroup } from 'primeng/api';
import { User } from 'src/app/core/interfaces/User';
import { CountryService } from 'src/app/demo/service/countryservice';
import { AuthService } from 'src/app/service/auth.service';
import { EditarInformacionExpertoService } from 'src/app/service/informcionEvaluador/editar-informacion-experto.service';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';


interface City {
  name: string,
  code: string
}

interface Country {
  name: string,
  code: string
}



@Component({
  selector: 'app-datos-experto',
  templateUrl: './datos-experto.component.html',
  styles: [`:host ::ng-deep .p-multiselect {
		min-width: 15rem;
	}

	:host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
		min-width: 20rem;
	}

	:host ::ng-deep .multiselect-custom .p-multiselect-label {
		padding-top: .25rem;
		padding-bottom: .25rem;

	}


	:host ::ng-deep .multiselect-custom .country-item.country-item-value {
		padding: .25rem .5rem;
		border-radius: 3px;
		display: inline-flex;
		margin-right: .5rem;
		background-color: var(--primary-color);
		color: var(--primary-color-text);
	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
		width: 17px;
	}

	:host ::ng-deep .multiselect-custom .country-item {
		display: flex;
		align-items: center;
	}

	:host ::ng-deep .multiselect-custom .country-item img.flag {
		width: 18px;
		margin-right: .5rem;
	}

	:host ::ng-deep .multiselect-custom .country-placeholder {
		padding: 0.25rem;
	}

	:host ::ng-deep .p-colorpicker {
		width: 2.5em
	}
  `]
})
export class DatosExpertoComponent implements OnInit {

    
    groupedCities: SelectItemGroup[];
    selectedCities4: any[];

    private correoResponsableDatos: string = '';
    public responsable: User;
    
    public password: string;
    public newPassword: string;
    public repPassword: string;
    public isFormValid = false;
    public areCredentialsInvalid = false;
    public passwordIncorrect = false;
    public passwordRepetida = false;
    
    public nombreResponsable: string;
    public direccionResponsable: string;
    public nivelDeFormacionResponsable: string;
    public apellidoResponsable: string;
    public telefonoResponsable: string;
    public paisResponsable: string = ""
    public ciudadResponsable: string = "";
  
    buttonMostrar: string = "Mostrar"
    buttonMostrarNuevo: string = "Mostrar"
    buttonMostrarRep: string = "Mostrar"
    validatePasswd = false;


  constructor(private countryService: CountryService, 
    private _Activatedroute:ActivatedRoute, private editarresponsableService: EditarInformacionExpertoService,
    private responsableServiceInformacion: InformacionEvaluadorService, private confirmationService: ConfirmationService,
    private messageService: MessageService, private router: Router, private autentificacionUsuario: AuthService) { 
    
  }

  ngOnInit(): void {
    
    if(this._Activatedroute.snapshot.paramMap.get("correo") != null){
      if(this._Activatedroute.snapshot.paramMap.get("correo") == this.autentificacionUsuario.emailUser){
        this.correoResponsableDatos = this._Activatedroute.snapshot.paramMap.get("correo")
      }else{
        this.autentificacionUsuario.logout();
      }
    }else if(this.autentificacionUsuario.emailUser != null ){
      this.correoResponsableDatos = this.autentificacionUsuario.emailUser;
    }else{
      this.correoResponsableDatos = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }

    this.obtenerInformacionExperto();
  }

  obtenerInformacionExperto(){
    this.responsableServiceInformacion.obtenerInformacionEvaluadorCorreo(this.correoResponsableDatos).then(
      responsable => {
        this.responsable = responsable;
      
        this.nombreResponsable = this.responsable?.nombre
        this.direccionResponsable = this.responsable.direccion
        this.nivelDeFormacionResponsable = this.responsable.nivelDeFormacion
        this.apellidoResponsable = this.responsable?.apellido
        this.telefonoResponsable = this.responsable.telefono
        this.paisResponsable = this.responsable?.pais
        this.ciudadResponsable = this.responsable?.ciudad

      }
    )
  }

  onSubmit(signInForm: NgForm){
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      this.passwordIncorrect = false;
      return;
    }
    this.verificarPassword();
  }

  verificarPassword(){
    if (this.newPassword != this.repPassword) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
      this.passwordIncorrect = false;
      return;
    }

    if(this.password == this.newPassword){
      this.isFormValid = false;
      this.areCredentialsInvalid = false;
      this.passwordIncorrect = false;
      this.passwordRepetida = true;
      return;
    }

    this.editarresponsableService.cambiarPassword(this.correoResponsableDatos, this.password, this.newPassword).subscribe(
      res => {
        console.log("valores: "+res.change)
        if(res.change == 'ok'){
          this.router.navigate(['login']);
          return;
        }
        
      },error => {
        this.isFormValid = false;
        this.areCredentialsInvalid = false;
        this.passwordIncorrect = true;
        return;
       
      }
      );
    
  }

  eliminarCuenta(){

    this.confirmationService.confirm({
      key: 'eliminarCuenta',
      message: '¿Esta seguro de eliminar tu cuenta?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({key: 'eliminarTOAST', severity: 'success', summary: 'Cuenta Eliminada', detail: 'La cuenta a sido Eliminada de manera satisfactoria'});
        this.editarresponsableService.eliminarCuenta(this.correoResponsableDatos, this.responsable.password);
        this.router.navigate(['login']);
      },
      reject: () => {
          this.messageService.add({key: 'eliminarTOAST', severity: 'error', summary: 'Acción Cancelada', detail: 'La acción no se llevo a cabo'});
      }
    });
    
  }

  editarCuenta(){
    this.confirmationService.confirm({
      key: 'editarCuenta',
      message: '¿Esta seguro de eliminar tu cuenta?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.responsable.nombre = this.nombreResponsable;
        this.responsable.direccion = this.direccionResponsable;
        this.responsable.nivelDeFormacion = this.nivelDeFormacionResponsable;
        this.responsable.apellido = this.apellidoResponsable;
        this.responsable.telefono = this.telefonoResponsable;
        this.responsable.pais = this.paisResponsable;
        this.responsable.ciudad = this.ciudadResponsable;
        this.editarresponsableService.editarCuenta(this.responsable);
        this.messageService.add({key: 'editarTOAST', severity: 'success', summary: 'Cuenta Actualizada', detail: 'La cuenta a sido actualizada de manera satisfactoria'});
        
      },
      reject: () => {
          this.messageService.add({key: 'editarTOAST', severity: 'error', summary: 'Acción Cancelada', detail: 'La acción no se llevo a cabo'});
      }
    });
    
  }

  mostrarPassword() {

    if (this.buttonMostrar == "Ocultar") {
      const p = document.getElementById("password") as HTMLInputElement;
      const b = document.getElementById("buttonMostrar") as HTMLInputElement;
      p.type = 'password';
      b.textContent = 'Mostrar';
      this.buttonMostrar = "Mostrar"
      return;
    }
    if (this.buttonMostrar == "Mostrar") {
      const p = document.getElementById("password") as HTMLInputElement;
      const b = document.getElementById("buttonMostrar") as HTMLInputElement;
      p.type = 'text';
      b.textContent = 'Ocultar';
      this.buttonMostrar = "Ocultar"
      return;
    }

  }

  validarPassword() {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (strongRegex.test(this.newPassword)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "green";
      p.textContent = "Contraseña Fuerte"
      this.validatePasswd = true;
    } else if (mediumRegex.test(this.newPassword)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "orange";
      p.textContent = "Contraseña Normal"
      this.validatePasswd = true;
    } else {
      const p = document.getElementById("tipoPassword");
      p.style.color = "#ce7483";
      p.textContent = "Contraseña Debil"
      this.validatePasswd = false;
    }

  }

  mostrarPasswordNUeva() {

    if (this.buttonMostrarNuevo == "Ocultar") {
      const p = document.getElementById("newPassword") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarNuevo") as HTMLInputElement;
      p.type = 'password';
      b.textContent = 'Mostrar';
      this.buttonMostrarNuevo = "Mostrar"
      return;
    }
    if (this.buttonMostrarNuevo == "Mostrar") {
      const p = document.getElementById("newPassword") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarNuevo") as HTMLInputElement;
      p.type = 'text';
      b.textContent = 'Ocultar';
      this.buttonMostrarNuevo = "Ocultar"
      return;
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
      p.type = 'password';
      b.textContent = 'Mostrar';
      this.buttonMostrarRep = "Mostrar"
      return;
    }
    if (this.buttonMostrarRep == "Mostrar") {
      const p = document.getElementById("repPassword") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarRep") as HTMLInputElement;
      p.type = 'text';
      b.textContent = 'Ocultar';
      this.buttonMostrarRep = "Ocultar"
      return;
    }

  }




}
