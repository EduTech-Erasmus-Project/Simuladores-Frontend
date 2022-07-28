import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ExpertoService } from "src/app/service/experto.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-lista-experto-por-aprobar",
  templateUrl: "./lista-experto-por-aprobar.component.html",
  styleUrls: ["./lista-experto-por-aprobar.component.scss"],
})
export class ListaExpertoPorAprobarComponent implements OnInit {
  public loadingExpertosPendientes = false;
  public expertoPen: any;
  private _subscriptions: Subscription[] = [];

  constructor(private expertoService: ExpertoService) {}

  ngOnInit(): void {
    this.loadParticipantes();
    this.expertoService.event.subscribe((result) => {
      //console.log("hola", result);
      this.loadParticipantes();
    });
  }
  private async loadParticipantes() {
    this.loadingExpertosPendientes = true;
    try {
      const expertoPendiente = await this.expertoService
        .obtenerExpertosPendientes()
        .toPromise();
      //console.log("Componente", expertoPendiente);
      this.expertoPen = expertoPendiente;
      this.loadingExpertosPendientes = false;
      this._subscriptions.push(expertoPendiente);
    } catch (error) {
      console.log(error);
    }
  }

  async approved(id, idU) {
    //console.log(id, idU);
    let data = {
      idU: idU,
      idE: id,
      estado: true,
      razon: null,
    };
    await this.expertoService.aprobarEvaluador(data).subscribe(
      (result) => {
        this.expertoService.emitEvent(true);
        Swal.fire({
          icon: "success",
          title: "Se ah aprovado al Experto",
          showConfirmButton: true,
        });
      },
      (error) => {
        console.log(error);
        Swal.showValidationMessage(`Request failed: Error inesperado`);
      }
    );
  }

  notApproved(id, idU) {
    //console.log(id);
    Swal.fire({
      title: "Escriba la razón del rechazo",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      showLoaderOnConfirm: true,
      preConfirm: async (razon) => {
        let data = {
          idU: idU,
          idE: id,
          estado: false,
          razon,
        };

        //console.log(data);

        try {
          let result = await this.expertoService
            .aprobarEvaluador(data)
            .toPromise();

          //this.loadPendientes();
          this.expertoService.emitEvent(true);
          //console.log(result);
          Swal.fire({
            icon: "success",
            title: "Se ah rechazado el participante",
            showConfirmButton: true,
          });
        } catch (error) {
          console.log(error);
          if (error.error.code === "not_found_razon") {
            Swal.showValidationMessage(
              `Error: No se ah proporcionado una razón del rechazo`
            );
          } else {
            Swal.showValidationMessage(`Request failed: Error inesperado`);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          icon: "success",
          title: "Se ah rechazado el participante",
          showConfirmButton: false,
        });
      }
    });
  }
}
