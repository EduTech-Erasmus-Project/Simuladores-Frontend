import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {

  public menu:any[];

  constructor(public app: AppComponent) { }

  ngOnInit(): void {
    this.menu = [
      {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/expert']},
      {label: 'Participantes', icon: 'pi pi-fw pi-users', routerLink: ['participantes']},
      {label: 'Mi Cuenta', icon: 'pi pi-fw pi-user', routerLink: ['mi-cuenta']},
    ];
   
  }

  

}
