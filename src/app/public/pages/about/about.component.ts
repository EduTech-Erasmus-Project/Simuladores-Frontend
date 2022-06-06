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
  imgLink = "assets/img/headway-5QgIuuBxKwM-unsplash.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
