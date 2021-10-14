import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-principal-usuario',
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrls: ['./pagina-principal-usuario.component.css'],
  animations: [
      trigger('mask-anim', [
          state('void', style({
              opacity: 0
          })),
          state('visible', style({
              opacity: 0.8
          })),
          transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
      ])
  ]
})
export class PaginaPrincipalUsuarioComponent implements OnInit {
  

  menuClick: boolean;
  sidebarActive: boolean;
  staticMenuActive: boolean;


  constructor() { }
  
  ngOnInit(): void {
  }

  onSidebarClick(event: Event) {
    this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
    this.staticMenuActive = !this.staticMenuActive;
    event.preventDefault();
  }

  
}
