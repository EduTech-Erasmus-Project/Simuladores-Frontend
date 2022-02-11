import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { CountryService } from 'src/app/demo/service/countryservice';
import { Participante } from 'src/app/model/Participante';
import { Responsable } from 'src/app/model/Responsable';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

interface City {
  name: string,
  code: string
}

interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
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
export class DatosUsuarioComponent implements OnInit {
    
  public groupedCities: SelectItemGroup[];
  public selectedCities4: any[];
  private correoParticanteDatos: string = '';
  public participante: Participante;
  
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

  constructor(private autentificacionUsuario: AutentificacionUsuarioService, private confirmationService: ConfirmationService,private messageService: MessageService,
    private router: Router, private evaluadorService: InformacionEvaluadorService,
    private usuarioService: InformacionParticipanteService ,private _Activatedroute:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    if(this._Activatedroute.snapshot.paramMap.get("correo") != null){
      if(this._Activatedroute.snapshot.paramMap.get("correo") == this.autentificacionUsuario.emailUser){
        this.correoParticanteDatos = this._Activatedroute.snapshot.paramMap.get("correo")
      }else{
        this.autentificacionUsuario.logout();
      }
    }else if(this.autentificacionUsuario.emailUser != null ){
      this.correoParticanteDatos = this.autentificacionUsuario.emailUser;
    }else{
      this.correoParticanteDatos = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }
    this.obtenerInformacionUsuario();
   
  }

  obtenerInformacionUsuario(){
    this.usuarioService.obtenerInformacionUsuario(this.correoParticanteDatos).subscribe(
      usuario => {this.getInformacionUsuario(usuario)}
    );
  }

  getInformacionUsuario(usuario: any){
    var evaluador: Responsable;
   
    this.evaluadorService.obtenerInformacionEvaluador(usuario.responsable).subscribe(
      responsable => {
        evaluador = new Responsable(
          responsable.id, responsable.email, responsable.nombre, responsable.apellido, responsable.telefono, 
          responsable.pais, responsable.ciudad, responsable.direccion, responsable.estado, responsable.nivelDeFormacion
        );

        this.participante = new Participante(
          usuario.id, usuario.email, usuario.nombre, usuario.apellido, usuario.telefono, 
          usuario.pais, usuario.ciudad, usuario.direccion, usuario.estado, usuario.fechaNacimiento, usuario.carreraUniversitaria,
          usuario.genero, usuario.numeroDeHijos, usuario.estadoCivil, usuario.etnia, usuario.estudiosPrevios, 
          usuario.codigoEstudiante, usuario.nivelDeFormacion, usuario.aceptacionPendianteResponsable, evaluador 
        );

        this.nombreParticipante = this.participante.getNombre;
        this.direccionParticipante = this.participante.getDireccion;
        this.carreraParticipante = this.participante.getCarreraUniversitaria;
        this.estudiosParticipante = this.participante.getEstudiosPrevios;
        this.apellidoParticipante = this.participante.getApellido;
        this.telefonoParticipante = this.participante.getTelefono;
        this.codigoParticipante = this.participante.getCodigoEstudiante;
        this.estadoCivilParticipante = this.participante.getEstadoCivil;
        this.paisParticipante  = this.participante.getPais;
        this.ciudadParticipante  = this.participante.getCiudad;

      }
    );
    
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

    this.usuarioService.cambiarPassword(this.correoParticanteDatos, this.password, this.newPassword).subscribe(
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
        this.usuarioService.eliminarCuenta(this.correoParticanteDatos, this.participante.getPassword);
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
        this.participante.setNombre = this.nombreParticipante;
        this.participante.setDireccion = this.direccionParticipante;
        this.participante.setcarreraUniversitaria = this.carreraParticipante;
        this.participante.setEstudiosPrevios = this.estudiosParticipante;
        this.participante.setApellido = this.apellidoParticipante;
        this.participante.setTelefono = this.telefonoParticipante;
        this.participante.setCodigoEstudiante = this.codigoParticipante;
        this.participante.setEstadoCivil = this.estadoCivilParticipante;
        this.participante.setPais = this.paisParticipante;
        this.participante.setCiudad = this.ciudadParticipante;
        this.usuarioService.editarCuenta(this.participante);
        this.messageService.add({key: 'editarTOAST', severity: 'success', summary: 'Cuenta Actualizada', detail: 'La cuenta a sido actualizada de manera satisfactoria'});
        
      },
      reject: () => {
          this.messageService.add({key: 'editarTOAST', severity: 'error', summary: 'Acción Cancelada', detail: 'La acción no se llevo a cabo'});
      }
    });
    
  }

}
