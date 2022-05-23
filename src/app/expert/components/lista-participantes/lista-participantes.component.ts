import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.scss']
})
export class ListaParticipantesComponent implements OnInit {

  public participantes: any;
  public loadingParticipantes = false;
  public displayMaximizable = false;
  public usuario:any;
  private _subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadParticipantes();
    let sub = this.usuarioService.event.subscribe((res) => {
      console.log(res);
      this.loadParticipantes();
    })
    this._subscriptions.push(sub);
  }

  private async loadParticipantes() {
    this.loadingParticipantes = true;
    try {
      const participantes = await this.usuarioService
        .obtenerParticipantes()
        .toPromise();
      console.log("pendientes", participantes);
      this.participantes = participantes;
      this.loadingParticipantes = false;
    } catch (error) {
      console.log(error);
    }
  }

  public async showModal(id) {
    try {
      let user = await this.usuarioService
        .obtenerInformacionParticipante(id)
        .toPromise();
      this.usuario = user;
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }

}
