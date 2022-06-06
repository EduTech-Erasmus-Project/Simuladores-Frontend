import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.component.html',
  styleUrls: ['./lista-pendientes.component.scss']
})
export class ListaPendientesComponent implements OnInit, OnDestroy {

  public participantesPendientes: any;
  public loadingPendientes = false;
  public usuario:any;
  public displayMaximizable = false;
  private _subscriptions: Subscription[] = [];

  constructor(private usuarioService: UsuarioService,) { }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadPendientes();
    //console.log("pendienstes");
    let sub = this.usuarioService.event.subscribe((res) => {
      //console.log(res);
      this.loadPendientes();
    })
    this._subscriptions.push(sub);
  }

  private async loadPendientes() {
    this.loadingPendientes = true;
    try {
      const participantes = await this.usuarioService.obtenerParticipantesPendientes().toPromise();
      //console.log("participantes pendientes", participantes);
      this.participantesPendientes = participantes;
      this.loadingPendientes = false;
    } catch (error) {
      console.log(error);
    }
  }

  async approved(id){
    //console.log(id);
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

  notApproved(id){
    //console.log(id);
    Swal.fire({
      title: 'Escriba la razón del rechazo',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: async (razon) => {
        let data = {
          idParticipante: id,
          estado: false,
          razon
        }

        //console.log(data);

        try {
          let result = await this.usuarioService.aprobarParticipantes(data).toPromise();
          //this.loadParticipantes();
            //this.loadPendientes();
            this.usuarioService.emitEvent(true);
            //console.log(result);
            Swal.fire({
              icon: 'success',
              title: 'Se ah rechazado el participante',
              showConfirmButton: true,
            })
        } catch (error) {
          console.log(error);
          if (error.error.code === 'not_found_razon'){
            Swal.showValidationMessage(
              `Error: No se ah proporcionado una razón del rechazo`
            )
          }else{
            Swal.showValidationMessage(
              `Request failed: Error inesperado`
            )
          }
        }
       
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          title: 'Se ah rechazado el participante',
          showConfirmButton: false,
        })
      }
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
