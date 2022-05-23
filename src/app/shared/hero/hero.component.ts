import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @Input() public titulo: string;
  @Input() public descripcion: string;
  @Input() public btnText: string;
  @Input() public imgLink: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.authService.user;
  }

}
