import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UsuarioService } from "src/app/service/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-lista-usuarios-reg-plat",
  templateUrl: "./lista-usuarios-reg-plat.component.html",
  styleUrls: ["./lista-usuarios-reg-plat.component.scss"],
})
export class ListaUsuariosRegPlatComponent implements OnInit {
  public loadingUsuarios = false;
  public usuarioApro: any;

  private _subscriptions: Subscription[] = [];
  public displayMaximizable: boolean;
  public idUsuario: number;
  public usuario: any;
  public estado: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadParticipantes();
    this.usuarioService.event.subscribe((result) => {
      //console.log("hola", result);
      this.loadParticipantes();
    });
  }
  private loadParticipantes() {
    this.loadingUsuarios = true;
    this.usuarioService.obtenerParticipantesUsuario().subscribe((res) => {
      this.usuarioApro = res;
    });
  }
  public async showModal(usuario1) {
    console.warn(usuario1);
    this.usuario = usuario1;
    try {
      //console.log(this.usuario);
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }

  public async bloquearCuenta(id) {
    // this.estado = true;
    //console.log("id", id);
    await this.usuarioService.bloqueoCuentaUsuario(id).subscribe(
      (result) => {

        //console.log("result estado cuenta", result);
        this.usuarioService.emitEvent(true);
        Swal.fire({
          icon: "success",
          title: `La cuenta del usuario a sido ${result.estado ? "activada" : "desactivada"} `,
          showConfirmButton: true,
        });
      },
      (error) => {
        console.log(error);
        Swal.showValidationMessage(`Request failed: Error inesperado`);
      }
    );
  }
}
