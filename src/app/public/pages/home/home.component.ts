import { Component, OnInit } from '@angular/core';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  participantes: number = 0;
  evaluadores: number = 0;
  simuladores: number = 0;

  titulo = "Simuladores laborales en 3D para favorecer la inserción laboral de estudiantes universitarios con discapacidad"
  descripcion = "La construcción y traducción de una pedagogía acorde a la variabilidad en el aprendizaje para fortalecer el desarrollo de competencias profesionales."
  btnText = "Comenzar"
  btnLink = "https://cdn.pixabay.com/photo/2018/06/07/16/49/vr-3460451_960_720.jpg"

  constructor(private informacion: InformacionParticipanteService) { }

  ngOnInit(): void {
    // this.informacion.obtenerInformacionLandingPage().then(res=> {
    //   this.participantes = res.participanteCount
    //   this.evaluadores = res.evaluadoresCount
    //   this.simuladores = res.simuladoresCount
    // }).catch(err=> {

    // });
  }

}
