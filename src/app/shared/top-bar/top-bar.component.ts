import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  activeItem: number;

  constructor(public appMain: AppComponent, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  get user(){
    return this.authService.user;
  }

  mobileMegaMenuItemClick(index) {
      this.appMain.megaMenuMobileClick = true;
      this.activeItem = this.activeItem === index ? null : index;
  }

  logOut() {
    this.authService.signOut();
  }

}
