import { Component, Input, OnInit } from '@angular/core';
import { PaginaPrincipalUsuarioComponent } from '../../User/pagina-principal-usuario/pagina-principal-usuario.component';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html'
})
export class MenuLateralComponent implements OnInit {

  modelItem: any[];
  correoParticipanteLateral: string = '';

  constructor(public appMainUser: PaginaPrincipalUsuarioComponent) { }

  ngOnInit() {
      this.correoParticipanteLateral = this.appMainUser.getCorreo();

    }

    onMenuClick() {
        this.appMainUser.menuClick = true;
    }

}
