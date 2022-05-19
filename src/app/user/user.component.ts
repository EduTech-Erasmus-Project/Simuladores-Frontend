import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  public menu:any[];

  constructor(
    public app: AppComponent
  ) {
    this.menu = [
      {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/user']},
      {label: 'Mi Cuenta', icon: 'pi pi-fw pi-user', routerLink: ['mi-cuenta']},
    ];
  }
  ngOnInit(): void {
    
  }

  
}
