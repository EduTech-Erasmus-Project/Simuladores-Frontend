import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PublicComponent } from "../../public/public.component";
import { Router, NavigationExtras } from "@angular/router";
import { LanguageService } from "src/app/service/language.service";
import { LoginService } from "src/app/service/login.service";
import { Subscription } from "rxjs";

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
    public loginService: LoginService,
    private router: Router
  ) {
    // try {
    //   if (
    //     this.loginService.user?.administrator ||
    //     this.loginService.validateRole("superuser")
    //   ) {
    //     this.router.navigateByUrl("/admin");
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
      {
        label: "Acerca de", //translate.translations.menu.aboutUs,
        routerLink: "about",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "¿Quiénes Somos?", //translate.translations.menu.aboutUs,
        routerLink: "about-us",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
      {
        label: "Contacto", //translate.translations.menu.contact,
        routerLink: "contact",
        routerLinkActiveOptions: {
          exact: true,
          //styleClass: "active",
        },
      },
    ];
  }

  mobileMegaMenuItemClick(index) {
    //this.appMain.megaMenuMobileClick = true;
    this.activeItem = this.activeItem === index ? null : index;
  }

  logOut() {
    //console.log("saliendo")
    this.loginService.signOut();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigateExpert(route: string) {
    let extras: NavigationExtras = {
      queryParams: {
        is_evaluated: "False",
      },
    };
    this.router.navigate([route], extras);
  }

  navigateStudent() {
    this.router.navigate(["recommended"]);
  }
}
