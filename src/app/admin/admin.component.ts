import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  public menu:any[];

  constructor(public app: AppComponent) { }

  ngOnInit(): void {
    this.menu = [
      {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']},
      {label: 'Expertos', icon: 'pi pi-fw pi-users', routerLink: ['expertos']},
      {label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['usuarios']},
      {label: 'simuladores', icon: 'pi pi-folder', routerLink: ['simuladores']},
      {label: 'Mi Cuenta', icon: 'pi pi-fw pi-user', routerLink: ['mi-cuenta']},
    ];
   
  }

}
