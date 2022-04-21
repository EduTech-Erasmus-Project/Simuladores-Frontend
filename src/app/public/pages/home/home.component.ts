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
