import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  public showPassword: boolean;
  isFormValid = false;
  areCredentialsInvalid = false;
  username: string = '';
  password: string = "";
  
  constructor(private autentificacionService: AutentificacionUsuarioService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(signInForm: NgForm){

    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    //check existencia de correo 
    
    this.autentificacionService.checkEmail(this.username).subscribe(
      responseAut => {
        
        
        if(responseAut.tipoUsuario!='notExist' && responseAut.tipoUsuario != ''){
         
          const userData = new Usuario(this.username, this.password);
          this.autentificacionService.checkCredencialesLogin(userData, responseAut.tipoUsuario).subscribe(
            response => {
              if (response.login == 'true') {
                if(responseAut.tipoUsuario =='evaluador'){
                  this.autentificacionService.isAuthenticated = true;
                  this.router.navigate(['Pagina-Principal-Experto/'], { queryParams: { 'correo': this.username }});
                  return true;
                }
                this.autentificacionService.isAuthenticated = true;
                this.router.navigate(['Pagina-Principal-Usuario/'], { queryParams: { 'correo': this.username }});
                return true;
              }else{
                this.autentificacionService.isAuthenticated = false;
                this.isFormValid = false;
                this.areCredentialsInvalid = true;
              }
            },
            error => {
              console.log(error);
              this.isFormValid = false;
              this.areCredentialsInvalid = true;
            });
        }else{
          this.isFormValid = false;
          this.areCredentialsInvalid = true;
        }

      },
      error => {
        console.log(error);
      });
    
    
    /*const userData = new Usuario(this.username, this.password);
    
    if (!this.autentificacionService.autentificacionUsuario(userData)) {
      
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }*/
  }


}
