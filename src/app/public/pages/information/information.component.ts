import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  titulo = "Información sobre el proyecto SimuLab"
  descripcion = "SimuLab, es una plataforma de recursos educativos 3D enfocados en medir las capacidades de enfrentar problemas y tareas en entornos laborales, junto con Psicólogos expertos."
  btnText = "Comenzar"
  imgLink = "assets/img/scott-graham-5fNmWej4tAA-unsplash.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
