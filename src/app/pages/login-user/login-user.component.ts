import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/model/Usuario';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  dark: boolean;
  checked: boolean;

  isFormValid = false;
  areCredentialsInvalid = false;
  
  constructor(private autentificacionService: AutentificacionUsuarioService) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm){

    console.log('Hemos entrado a: MetodoLogin');
      
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);

  }

  private checkCredentials(signInForm: NgForm) {
    const userData = new Usuario(signInForm.value.login, signInForm.value.password);
    if (!this.autentificacionService.autentificacionUsuario(userData)) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
  }

}
