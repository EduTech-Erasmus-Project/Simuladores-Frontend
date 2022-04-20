import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';
import { PhotoService } from 'src/app/demo/service/photoservice';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';

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
  

  public menuClick: boolean;
  public sidebarActive: boolean;
  public staticMenuActive: boolean;
  public topbarMenuActive: boolean;
  public megaMenuMobileClick: boolean;
  public megaMenuMobileActive: boolean;
  public topbarMobileMenuClick: boolean;
  public  topbarMobileMenuActive: boolean;
  public  menuMobileActive: boolean;
  public  activeTopbarItem: any;
  public topbarItemClick: boolean;
  
  //varibales para paginas usuario
  private correo: string;

  constructor(private router: Router, private route: ActivatedRoute, private autentificacionUsuario: AutentificacionUsuarioService) { 
   
  }
  
  ngOnInit(): void {
    if(this.autentificacionUsuario.emailUser != null ){
      this.correo = this.autentificacionUsuario.emailUser;
    }else{
      this.correo = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }
  }

  getCorreo():string{
    return this.correo;
  }

  onSidebarClick(event: Event) {
    this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
    this.staticMenuActive = !this.staticMenuActive;
    event.preventDefault();
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
        this.menuMobileActive = !this.menuMobileActive;
    }

    event.preventDefault();
  }

  onMegaMenuMobileButtonClick(event) {
    this.megaMenuMobileClick = true;
    this.megaMenuMobileActive = !this.megaMenuMobileActive;

    event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event) {
    this.topbarMobileMenuClick = true;
    this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
        this.activeTopbarItem = null; } else {
        this.activeTopbarItem = item; }

    event.preventDefault();
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  
}
