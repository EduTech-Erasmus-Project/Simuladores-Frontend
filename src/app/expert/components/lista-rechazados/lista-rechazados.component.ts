import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-rechazados',
  templateUrl: './lista-rechazados.component.html',
  styleUrls: ['./lista-rechazados.component.scss']
})
export class ListaRechazadosComponent implements OnInit {

  public participantesRechazados: any;
  public loadingRechazados = false;
  public usuario:any;
  public displayMaximizable = false;
  private _subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService,) { }

  ngOnInit(): void {
    this.loadPendientes();
    //console.log("Rechazados");
    let sub = this.usuarioService.event.subscribe((res) => {
      //console.log(res);
      this.loadPendientes();
    })
    this._subscriptions.push(sub);
  }

  private async loadPendientes() {
    this.loadingRechazados = true;
    try {
      const participantes = await this.usuarioService.obtenerParticipantesRechazados().toPromise();
      this.participantesRechazados = participantes;
      this.loadingRechazados = false;
    } catch (error) {
      console.log(error);
    }
  }

  async approved(id){
    //console.log("id", id);
    let data = {
      idParticipante: id,
      estado: true,
      razon: null
    }
    await this.usuarioService.aprobarParticipantes(data).subscribe(result => {
      //this.loadParticipantes();
      //his.loadPendientes();
      this.usuarioService.emitEvent(true);
      Swal.fire({
        icon: 'success',
        title: 'Se ah aprovado al participante',
        showConfirmButton: true,
      })
    }, error => {
      console.log(error);
      Swal.showValidationMessage(
        `Request failed: Error inesperado`
      )
    })
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
