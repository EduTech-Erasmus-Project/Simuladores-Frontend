import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';
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
  nombreParticipante: string = "";
  apellidoParticipante: string = "";
  telefonoParticipante: string = "";
  paisParticipante: string = "";
  ciudadParticipante: string = "";
  direccionParticipante: string = "";
  fechaNacimientoParticipante: string = "";
  carreraParticipante: string = "";
  estudiosPreviosParticipante: string = "";
  nivelFormacionParticipante: string = "";
  codigoEstudianteParticipante: string = "";
  numeroHijosParticipante: number = 0;
  etniaParticipante: string = "";
  emailParticipante: string = "";
  passwordParticipante: string = "";
  passwordVerificacionParticipante: string = "";
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
  validatePasswd = false;
  passwordIncorrect: boolean;
  buttonMostrar: string = "Mostrar"
  buttonMostrarVerificacion: string = "Mostrar"
  checkCorreo = false;

  constructor(private informacionEvaluador: InformacionEvaluadorService, private autentificacionService: AutentificacionUsuarioService) {

  }

  estadosCiviles: any[] = [
    { name: 'Casado/a', value: 'Casado' },
    { name: 'Soltero/a', value: 'Soltero' },
    { name: 'Viudo/a', value: 'Viudo' },
    { name: 'Separado/a', value: 'Separado' },
    { name: 'Union Libre', value: 'Union Libre' },
    { name: 'Otro', value: 'Otro' }
  ];

  discapacidadPersona: any[] = [
    { name: 'Visual', value: 'Visual' },
    { name: 'Intelectual', value: 'Intelectual' },
    { name: 'Física', value: 'Fisica' },
    { name: 'Auditiva', value: 'Auditiva' },
    { name: 'Otras', value: 'Otras' },
  ];

  ngOnInit(): void {
    this.recuperarEvaluadores();
  }

  recuperarEvaluadores() {
    var nombre: string = ''
    this.informacionEvaluador.recuperarEvaluadoresParaRegistro().then(
      evaluadores => {
        evaluadores.forEach(evaluador => {
          nombre = evaluador.nombre + evaluador.apellido
          this.evaluadoresList.push({ name: nombre, value: evaluador.correo })
        });
      }
    );
  }



  onSubmit(signInForm: NgForm) {

    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      //  return;
    }
    this.validadCorreo();
  }

  validadCorreo() {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    
    if(regex.test(this.emailParticipante)) {
      this.autentificacionService.checkEmail(this.emailParticipante).subscribe(res => {
        if (res.tipoUsuario != "notExist") {
          this.areCredentialsInvalid = true;
          return;
        }
        this.validarPassword();
      });
    }else{
      this.areCredentialsInvalid = true;
      return;
    }
    
  }

  checkRegexCorreo() {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    
    if(regex.test(this.emailParticipante)) {
      this.checkCorreo = false;
      return;
    }else{
      this.checkCorreo = true;
      return;
    }
    
  }

  validarPassword(){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if(strongRegex.test(this.passwordParticipante)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "green";
      p.textContent = "Contraseña Fuerte"
      this.validatePasswd = true;
      this.verificacionSimilaridadPassword();
    }else if(mediumRegex.test(this.passwordParticipante)) {
      const p = document.getElementById("tipoPassword");
      p.style.color = "orange";
      p.textContent = "Contraseña Normal"
      this.validatePasswd = true;
      this.verificacionSimilaridadPassword();
    } else {
      const p = document.getElementById("tipoPassword");
      p.style.color = "#ce7483";
      p.textContent = "Contraseña Debil"
      this.validatePasswd = false;
    }
    
  }

  verificacionSimilaridadPassword(){
    
    if(this.passwordParticipante != this.passwordVerificacionParticipante){
      this.passwordIncorrect = true;
      return;
    }else{
      this.passwordIncorrect = false;
    }
    
  }

  mostrarPassword(){
    
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

  mostrarPasswordVerificacion(){
    
    if (this.buttonMostrarVerificacion == "Ocultar") {
      const p = document.getElementById("passwordVerificacion") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarVerificacion") as HTMLInputElement;
      p.type = 'password';
      b.textContent = 'Mostrar';
      this.buttonMostrarVerificacion = "Mostrar"
      return;
    }
    if (this.buttonMostrarVerificacion == "Mostrar") {
      const p = document.getElementById("passwordVerificacion") as HTMLInputElement;
      const b = document.getElementById("buttonMostrarVerificacion") as HTMLInputElement;
      p.type = 'text';
      b.textContent = 'Ocultar';
      this.buttonMostrarVerificacion = "Ocultar"
      return;
    }
    
  }

  agregarExperiencia() {

  }

  agregarDiscapacidad() {

  }




}
