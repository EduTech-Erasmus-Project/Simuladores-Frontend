import { Component, OnInit } from '@angular/core';
import { PaginaPrincipalUsuarioComponent } from '../../User/pagina-principal-usuario/pagina-principal-usuario.component';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html'
})
export class MenuLateralComponent implements OnInit {

  modelItem: any[];

  constructor(public appMainUser: PaginaPrincipalUsuarioComponent) { }

  ngOnInit() {
        this.modelItem = [
            {
                label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/Pagina-Principal-Usuario']
            },
            {
                label: 'Mi Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/Pagina-Principal-Usuario/datosUsuario']
            },
            {
                label: 'Mis Actividades', icon: 'pi pi-fw pi-chart-line', routerLink: ['/Pagina-Principal-Usuario/Mis-Actividades-Usuario']
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
