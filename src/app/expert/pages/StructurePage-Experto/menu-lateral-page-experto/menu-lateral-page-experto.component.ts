import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral-page-experto',
  templateUrl: './menu-lateral-page-experto.component.html'
})
export class MenuLateralPageExpertoComponent implements OnInit {

  modelItem: any[];
  //sidebarActive: boolean;
  correoEvaluadorLateral: string = '';

  constructor() { }

  ngOnInit() {
    //this.correoEvaluadorLateral = this.appMainUser.getCorreo();

    this.modelItem = [
        {
            label: 'Acerca de', icon: 'pi pi-fw pi-users', url: ['https://www.primefaces.org/store']
        }
    ];
  }

  onMenuClick() {
    //this.appMainUser.menuClick = true;
  }
}
