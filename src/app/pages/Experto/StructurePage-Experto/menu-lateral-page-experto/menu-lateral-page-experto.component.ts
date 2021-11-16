import { Component, OnInit } from '@angular/core';
import { PaginaPrincipalExpertoComponent } from '../../pagina-principal-experto/pagina-principal-experto.component';

@Component({
  selector: 'app-menu-lateral-page-experto',
  templateUrl: './menu-lateral-page-experto.component.html'
})
export class MenuLateralPageExpertoComponent implements OnInit {

  modelItem: any[];
  //sidebarActive: boolean;

  constructor(public appMainUser :PaginaPrincipalExpertoComponent) { }

  ngOnInit() {
    this.modelItem = [
        {
            label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/Pagina-Principal-Experto']
        },
        {
            label: 'Mi Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/Pagina-Principal-Experto/datosExperto']
        },
        {
            label: 'Agregar/Listar Alumanos', icon: 'pi pi-fw pi-chart-line', routerLink: ['/Pagina-Principal-Experto/agregarAlumno']
        },
        {
            label: 'Acerca de', icon: 'pi pi-fw pi-users', url: ['https://www.primefaces.org/store']
        }
    ];
  }

  onMenuClick() {
    this.appMainUser.menuClick = true;
  }
}
