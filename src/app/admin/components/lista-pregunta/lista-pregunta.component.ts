import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/api";
import { Subscription } from "rxjs";
import { PreguntaService } from "src/app/service/pregunta.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { Pregunta } from "src/app/core/interfaces/Pregunta";
@Component({
  selector: "app-lista-pregunta",
  templateUrl: "./lista-pregunta.component.html",
  styleUrls: ["./lista-pregunta.component.scss"],
})
export class ListaPreguntaComponent implements OnInit, OnDestroy {
  public form?: FormGroup;
  public formData: FormData;
  public loadingPregunta = false;
  public pregunta: any;
  public loader = false;

  private _subscriptions: Subscription[] = [];
  public msg: Message[];
  public id: any;
  public displayMaximizable: boolean;
  public display = false;
  public usuario: any;

  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadPregunta();
  }

  private async loadPregunta() {
    this.loadingPregunta = true;
    this.id = Number(this.activateRoute.snapshot.paramMap.get("id"));
    let sub = await this.preguntaService
      .obtenerListaPregunta(this.id)
      .subscribe((res) => {
        this.pregunta = res;
      });
    this._subscriptions.push(sub);
  }

  public async eliminarPregunta(id: number) {
    let sub = await this.preguntaService.eliminarPregunta(id).subscribe(
      (respuesta) => {
        this.loadPregunta();
        Swal.fire({
          icon: "success",
          title: "Se ha eliminado correctamente",
          showConfirmButton: true,
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Se ha producido un error al eliminar",
          showConfirmButton: true,
        });
      }
    );
    this._subscriptions.push(sub);
  }
}
