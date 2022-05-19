import { Component, Input, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-private-menu",
  templateUrl: "./private-menu.component.html",
  styleUrls: ["./private-menu.component.scss"],
})
export class PrivateMenuComponent implements OnInit {
  @Input() menu: any[];

  constructor(public appMain: AppComponent) {}

  ngOnInit() {
    
  }

  onMenuClick() {
    this.appMain.menuClick = true;
  }

  
}
