import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  titulo = "Con el Objetivo de Brindar una mejora de la calidad Educatica"
  descripcion = " El proyecto "+"Asistencia tecnológica a la accesibilidad en la Educación Superior Virtual (EduTech)"+" trabaja en cooperación para la innovación y el intercambio de buenas prácticas. La acción está destinada a respaldar la modernización, accesibilidad e internacionalización de la educación superior en los países asociados contribuyendo a su desarrollo y crecimiento socioeconómico sostenible e integrador."
  btnText = "Comenzar"
  btnLink = "https://cdn.pixabay.com/photo/2016/11/21/13/51/woman-1845517_960_720.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
