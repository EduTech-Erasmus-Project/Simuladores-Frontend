import { Component, OnInit } from '@angular/core';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [
    './landing.component.css',
    '../../../../assets/theme/blue/theme-light.css',
    '../../../../assets/layout/css/blue/layout-light.css'
]
})
export class LandingComponent implements OnInit {

  participantes: number = 0;
  evaluadores: number = 0;
  simuladores: number = 0;
  
  constructor(private informacion: InformacionParticipanteService) { }

  ngOnInit(): void {
    this.informacion.obtenerInformacionLandingPage().then(res=> {
      this.participantes = res.participanteCount
      this.evaluadores = res.evaluadoresCount
      this.simuladores = res.simuladoresCount
    });
  }

}
