import { Component, OnInit } from '@angular/core';
import { PaginaPrincipalExpertoComponent } from '../../pagina-principal-experto/pagina-principal-experto.component';

@Component({
  selector: 'app-menu-lateral-page-experto',
  templateUrl: './menu-lateral-page-experto.component.html'
})
export class MenuLateralPageExpertoComponent implements OnInit {

  modelItem: any[];
  //sidebarActive: boolean;
  correoParticipanteLateral: string = '';

  constructor(public appMainUser :PaginaPrincipalExpertoComponent) { }

  ngOnInit() {
    this.correoParticipanteLateral = this.appMainUser.getCorreo();

    this.modelItem = [
        {
            label: 'Acerca de', icon: 'pi pi-fw pi-users', url: ['https://www.primefaces.org/store']
        }
    ];
  }

  onMenuClick() {
    this.appMainUser.menuClick = true;
  }
}
