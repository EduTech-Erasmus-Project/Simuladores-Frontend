import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { CountryService } from 'src/app/demo/service/countryservice';
import { Participante } from 'src/app/model/Participante';
import { Responsable } from 'src/app/model/Responsable';
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

  constructor(private evaluadorService: InformacionEvaluadorService,private usuarioService: InformacionParticipanteService ,private _Activatedroute:ActivatedRoute, private countryService: CountryService, private breadcrumbService: BreadcrumbService) { 
    countryService.getCountriesCity().subscribe(res => {
        this.groupedCities = res.data as any[]
      }
    );
    
  }

  ngOnInit(): void {
    this.correoParticanteDatos = this._Activatedroute.snapshot.paramMap.get("correo");
    //console.log("Pagina de Mis actividades: ", this.correoParticanteDatos)
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
          responsable.pais, responsable.ciudad, responsable.direccion, responsable.nivelDeFormacion
        );

        this.participante = new Participante(
          usuario.id, usuario.email, usuario.nombre, usuario.apellido, usuario.telefono, 
          usuario.pais, usuario.ciudad, usuario.direccion, usuario.fechaNacimiento, usuario.carreraUniversitaria,
          usuario.genero, usuario.numeroDeHijos, usuario.estadoCivil, usuario.etnia, usuario.estudiosPrevios, 
          usuario.codigoEstudiante, usuario.nivelDeFormacion, evaluador 
        );
      }
    );
    
  }

  onSubmit(signInForm: NgForm){
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
  }

 

}
