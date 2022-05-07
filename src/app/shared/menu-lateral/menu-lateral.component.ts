import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { PaginaPrincipalUsuarioComponent } from 'src/app/user/pages/pagina-principal-usuario/pagina-principal-usuario.component';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html'
})
export class MenuLateralComponent implements OnInit {

  modelItem: any[];
  correoParticipanteLateral: string = '';

  //public appMainUser: PaginaPrincipalUsuarioComponent

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.correoParticipanteLateral = this.authService.emailUser;

    }

    onMenuClick() {
        //this.appMainUser.menuClick = true;
    }

}
