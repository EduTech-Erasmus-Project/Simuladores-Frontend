import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { CountryService } from 'src/app/demo/service/countryservice';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css',
    '../../../assets/theme/blue/theme-light.css',
    '../../../assets/layout/css/blue/layout-light.css'
]
})
export class RegistrarUserComponent implements OnInit {
  
  //Varibles para el formulario
  nombreParticipante: string ="";
  apellidoParticipante: string ="";
  telefonoParticipante: string ="";
  paisParticipante: string ="";
  ciudadParticipante: string ="";
  direccionParticipante: string ="";
  fechaNacimientoParticipante: string ="";
  carreraParticipante: string ="";
  estudiosPreviosParticipante: string ="";
  nivelFormacionParticipante: string ="";
  codigoEstudianteParticipante: string ="";
  numeroHijosParticipante: number =0;
  etniaParticipante: string ="";
  emailParticipante: string ="";
  passwordParticipante: string ="";
  passwordVerificacionParticipante: string ="";
  gradoDiscapacidadParticipante: number = 0;
  areaLaboralParticipante: string = "";
  experienciaAniosParticipante: string = "";
  sectorEconomicoParticipante: string = "";
  
  variableGeneroRadio: string;
  seleccionEstadoCivil: any = null;
  seleccionTipoDiscapacidad: any = null;
  seleccionEvaluador: any = null;
  evaluadoresList: any[] = [];
  cantidadDiscapacidad: number = 1;
  listaDiscapacidades: any[] = [];
  cantidadExperienciaLaboral: number = 1;
  
  usuarioRegistrado: boolean = false;
  usuarioNoRegistrado: boolean = true;
  
  isFormValid = false;
  areCredentialsInvalid = false;

  constructor(private informacionEvaluador: InformacionEvaluadorService) { 
    
  }

  estadosCiviles: any[] = [
    {name: 'Casado/a', value: 'Casado'},
    {name: 'Soltero/a', value: 'Soltero'},
    {name: 'Viudo/a', value: 'Viudo'},
    {name: 'Separado/a', value: 'Separado'},
    {name: 'Union Libre', value: 'Union Libre'},
    {name: 'Otro', value: 'Otro'}
  ];

 discapacidadPersona: any[] = [
    {name: 'Visual', value: 'Visual'},
    {name: 'Intelectual', value: 'Intelectual'},
    {name: 'Física', value: 'Fisica'},
    {name: 'Auditiva', value: 'Auditiva'},
    {name: 'Otras', value: 'Otras'},
  ];

  ngOnInit(): void {
    this.recuperarEvaluadores();
  }

  recuperarEvaluadores(){
    var nombre:string = ''
    this.informacionEvaluador.recuperarEvaluadoresParaRegistro().then(
      evaluadores => {
        evaluadores.forEach(evaluador => {
          nombre = evaluador.nombre + evaluador.apellido
          this.evaluadoresList.push({name:nombre, value:evaluador.correo})
        });
      }
    );
  }

  registrarParticipante(){
    
  }

  onSubmit(signInForm: NgForm){
    console.log("//////"+this.nombreParticipante)
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    
    //this.usuarioRegistrado = true;
    //this.usuarioNoRegistrado = false;

  }

  agregarExperiencia(){

  }

  agregarDiscapacidad(){

  }




}
