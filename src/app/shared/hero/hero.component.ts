import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @Input() public titulo: string;
  @Input() public descripcion: string;
  @Input() public btnText: string;
  @Input() public btnLink: string;

  constructor() { }

  ngOnInit(): void {
  }

}
