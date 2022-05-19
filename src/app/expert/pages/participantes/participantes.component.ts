import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { forkJoin } from "rxjs";
import { UsuarioService } from "src/app/service/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-participantes",
  templateUrl: "./participantes.component.html",
  styleUrls: ["./participantes.component.scss"],
})
export class ParticipantesComponent implements OnInit {
  public participantes: any;
  public participantesPendientes: any;
  public loadingParticipantes = false;
  public loadingPendientes = false;
  public idParticipante: number;
  public displayMaximizable = false;


  constructor(private usuarioService: UsuarioService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.loadParticipantes();
    this.loadPendientes();
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

  private async loadPendientes() {
    this.loadingPendientes = true;
    try {
      const participantes = await this.usuarioService
        .obtenerParticipantesPendientes()
        .toPromise();
      console.log("participantes pendientes", participantes);
      this.participantesPendientes = participantes;
      this.loadingPendientes = false;
    } catch (error) {
      console.log(error);
    }
  }

  public showModal(id){
    console.log(id);
    this.idParticipante = id;
    this.displayMaximizable = true;
  }
  
  async approved(id){
    console.log(id);
    let data = {
      idParticipante: id,
      estado: true,
      razon: null
    }
    await this.usuarioService.aprobarParticipantes(data).subscribe(result => {
      this.loadParticipantes();
      this.loadPendientes();
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
    console.log(id);
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

        console.log(data);

        try {
          let result = await this.usuarioService.aprobarParticipantes(data).toPromise();
          this.loadParticipantes();
            this.loadPendientes();
            console.log(result);
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
}
