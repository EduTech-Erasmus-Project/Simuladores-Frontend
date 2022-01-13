import { Component, Input, OnInit } from '@angular/core';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';
import { PaginaPrincipalUsuarioComponent } from '../../User/pagina-principal-usuario/pagina-principal-usuario.component';

@Component({
  selector: 'app-menu-top-bar',
  template: `
    
    <div class="layout-topbar">
		<div class="layout-topbar-wrapper">
			<div class="layout-topbar-left">
				<div class="layout-topbar-logo-wrapper">
					<a href="#" class="layout-topbar-logo">
						<img src="https://pbs.twimg.com/profile_images/1407722978817753092/1c1uNlH7_400x400.jpg" />
						<span class="app-name">Simuladores</span>
					</a>
				</div>

				<a href="#" class="sidebar-menu-button" (click)="appMain.onMenuButtonClick($event)">
					<i class="pi pi-bars"></i>
				</a>

				<a href="#" class="megamenu-mobile-button" (click)="appMain.onMegaMenuMobileButtonClick($event)">
					<i class="pi pi-align-right megamenu-icon"></i>
				</a>

				<a href="#" class="topbar-menu-mobile-button" (click)="appMain.onTopbarMobileMenuButtonClick($event)">
					<i class="pi pi-ellipsis-v"></i>
				</a>

					
            </div>


			<div class="layout-topbar-right fadeInDown" style="margin-left: 2%; width: 100%;">
				<ul class="layout-topbar-actions" style="width: 100%;">
					<!--Codigo para generar caja de texto-->
					<li #search style="width: 30%;"  class="search-item topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === search}">
						<a href="#" class="topbar-search-mobile-button" (click)="appMain.onTopbarItemClick($event,search)">
							<i class="topbar-icon pi pi-search"></i>
						</a>
						<ul  class="search-item-submenu fadeInDown" style="width: 100%;" (click)="appMain.topbarItemClick = true">
							<li>
								<span class="md-inputfield search-input-wrapper" style="width: 100%;">
									<input pInputText class="p-inputtext-lg"  style="width: 80%;" placeholder="Search..."/>
									<a (click)="buscarEnPagina()">
										<span>
											<i class="pi pi-search"  style="width: 20%;"></i>
										</span>
									</a>
									
								</span>
							</li>
						</ul>
					</li>
					
					<li class="topbar-item" style="width: 50%;">
						<span class="fadeInDown" style="text-align: center;">
							<h4> Asistencia tecnológica a la accesibilidad en la <br> Educación Superior Virtual </h4>
						</span>
					</li>
					
					<!--Codifo ngfor para mostrar todas las notificaciones-->
					<li #notificacion class="topbar-item"  [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === notificacion}">
						<a href="#" (click)="appMain.onTopbarItemClick($event,notificacion)">
							<i class="topbar-icon pi pi-bell"></i>
						</a>
						<ul class="fadeInDown">
							<li class="layout-submenu-header">
								<h1>Notificación</h1>
								<span>Tienes mensajes nuevos</span>
							</li>
							<li class="layout-submenu-item">
								<img src="assets/layout/images/topbar/avatar-cayla.png" alt="mirage-layout" width="35" />
								<div class="menu-text">
									<p>Actualizacion de Nota</p>
									<span>Cayla Brister</span>
								</div>
								<i class="pi pi-angle-right"></i>
							</li>
						</ul>
					</li>
					
					<!--Perfil de usuario presentacion menu-->
					<li #profile class="topbar-item profile-item" style="width: 15%;" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === profile}">
						<a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
						<span class="profile-info-wrapper">
							<h3>{{correoParticipante}}</h3>
							<span>Estudiante</span>
						</span>
						</a>
					</li>

					<!--Salir de la pagina Usuario-->
					<li class="topbar-item" style="width: 5%;">
						<a (click)="logout()">
						<span>
							<i class="topbar-icon pi pi-sign-out"></i>
						</span>
						
						</a>
					</li>
					
					
				</ul>

				
			</div>
         </div>
    </div>


  `,
  styles: [
  ]
})
export class MenuTopBarComponent implements OnInit {

	activeItem: number;
	@Input() correoParticipante: string = '';

	constructor(public appMain: PaginaPrincipalUsuarioComponent, public autentificacionServices: AutentificacionUsuarioService) { }
	
	ngOnInit(): void {
		//this.correoParticipante = this.appMain.correo;
	}

	mobileMegaMenuItemClick(index) {
	this.appMain.megaMenuMobileClick = true;
	this.activeItem = this.activeItem === index ? null : index;
	}

	logout(){
		this.autentificacionServices.logout();
	}

	buscarEnPagina(){

	}

	
}
