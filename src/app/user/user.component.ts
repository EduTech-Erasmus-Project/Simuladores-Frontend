import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  public menuClick: boolean;
  public sidebarActive: boolean;
  public staticMenuActive: boolean;
  public topbarMenuActive: boolean;
  public megaMenuMobileClick: boolean;
  public megaMenuMobileActive: boolean;
  public topbarMobileMenuClick: boolean;
  public topbarMobileMenuActive: boolean;
  public menuMobileActive: boolean;
  public activeTopbarItem: any;
  public topbarItemClick: boolean;

  //varibales para paginas usuario
  private correo: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private autentificacionUsuario: AuthService
  ) {}

  ngOnInit(): void {
    if (this.autentificacionUsuario.emailUser != null) {
      this.correo = this.autentificacionUsuario.emailUser;
    } else {
      this.correo = this.autentificacionUsuario.getcorreoPorToken(
        this.autentificacionUsuario.getToken
      );
    }
  }

  getCorreo(): string {
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
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  isMobile() {
    return window.innerWidth <= 991;
  }
}
