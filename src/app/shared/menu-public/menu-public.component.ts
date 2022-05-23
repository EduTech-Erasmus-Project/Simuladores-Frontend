import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PublicComponent } from "../../public/public.component";
import { Router, NavigationExtras } from "@angular/router";
import { LanguageService } from "src/app/service/language.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-menu-public",
  templateUrl: "./menu-public.component.html",
  styleUrls: ["./menu-public.component.scss"],
})
export class MenuPublicComponent implements OnInit, OnDestroy{
  public translate: TranslateService;
  public tieredItems: any;
  public activeItem: number;
  public selectedCountry: string;
  public countries: any[];
  public loged: boolean;
  private _subscriptions: Subscription[] = [];
  //private queryParams: QuerySearch = {};

  constructor(
    public appMain: PublicComponent,
    private languageService: LanguageService,
    private router: Router,
    private authService: AuthService,
  ) {
    // try {
    //   if (
    //     this.loginService.user?.administrator ||
    //     this.loginService.validateRole("superuser")
    //   ) {
    //     this.router.navigateByUrl("/dashboard");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.translate = this.languageService.translate;
    this.loadMenu();

    // this.loginService
    //   .isLoged()
    //   .then((res: boolean) => {
    //     //console.log("menu res", res);
    //     this.loged = res;
    //   })
    //   .catch((err: boolean) => {
    //     //console.log("menu err", err);
    //     this.loged = err;
    //   });

    //this.loged = false
  }

  loadMenu() {
    this.countries = [
      { name: "Español", code: "ES" },
      { name: "Ingles", code: "US" },
    ];

    //this.translate.onLangChange.subscribe((translate: LangChangeEvent) => {
    this.tieredItems = [
      {
        label: "Inicio", //translate.translations.menu.home,
        routerLink: "/",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "Información", //translate.translations.menu.aboutUs,
        routerLink: "information",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "Simuladores", //translate.translations.menu.aboutUs,
        routerLink: "simulators",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      // {
      //   label: "Acerca de", //translate.translations.menu.aboutUs,
      //   routerLink: "about",
      //   routerLinkActiveOptions: {
      //     exact: true,
      //   },
      // },
      {
        label: "¿Quiénes Somos?", //translate.translations.menu.aboutUs,
        routerLink: "about-us",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      // {
      //   label: "Contacto", //translate.translations.menu.contact,
      //   routerLink: "contact",
      //   routerLinkActiveOptions: {
      //     exact: true,
      //     //styleClass: "active",
      //   },
      // },
    ];
  }

  get user(){
    return this.authService.user;
  }

  mobileMegaMenuItemClick(index) {
    //this.appMain.megaMenuMobileClick = true;
    this.activeItem = this.activeItem === index ? null : index;
  }

  logOut() {
    this.authService.signOut();
  }

  navigate() {
    console.log(this.user);
    if(this.user.tipoUser === "admin"){
      this.router.navigate(["/dashboard"]);
    }
    if(this.user.tipoUser === "participante"){
      this.router.navigate(["/user"]);
    }
    if(this.user.tipoUser === "evaluador"){
      this.router.navigate(["/expert"]);
    }
    
  }

  navigateMiCuenta() {
    if(this.user.tipoUser === "admin"){
      this.router.navigate(["/dashboard/mi-cuenta"]);
    }
    if(this.user.tipoUser === "participante"){
      this.router.navigate(["/user/mi-cuenta"]);
    }
    if(this.user.tipoUser === "evaluador"){
      this.router.navigate(["/expert/mi-cuenta"]);
    }
  }
  
}
