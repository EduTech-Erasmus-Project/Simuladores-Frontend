import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  activeItem: number;

  constructor(public appMain: AppComponent) {}

  ngOnInit(): void {
    
  }

  mobileMegaMenuItemClick(index) {
      this.appMain.megaMenuMobileClick = true;
      this.activeItem = this.activeItem === index ? null : index;
  }

}
