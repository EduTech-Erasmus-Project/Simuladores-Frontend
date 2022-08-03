import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DiscapacidadParticipanteInterface } from "src/app/core/interfaces/DiscapacidadParticipante";
import { CompetenciaService } from "src/app/service/competencia.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DiscapacidadesService } from "src/app/service/discapacidades.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-principales-discapacidades",
  templateUrl: "./principales-discapacidades.component.html",
  styleUrls: ["./principales-discapacidades.component.scss"],
})
export class PrincipalesDiscapacidadesComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingDiscapacidades = false;
  public discapacidad: any;
  public discapacidad1: DiscapacidadParticipanteInterface;
  private titulo!: string;
  private descripcion!: string;
  public display1 = false;
  private id: number;
  public nombre11: string;
  public descripcion11: string;
  public display = false;
  public form = this.fb.group({
    tipoDiscapacidad: ["", Validators.required],
    descripcion: ["", Validators.required],
  });

  constructor(
    private discapacidadesService: DiscapacidadesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadDiscapacidades();
    this.discapacidadesService.event.subscribe((result) => {
      //console.log("hola", result);
      this.loadDiscapacidades();
    });
  }

  private async loadDiscapacidades() {
    this.loadingDiscapacidades = true;
    try {
      const discapacidades = await this.discapacidadesService
        .listaDiscapacidad()
        .toPromise();
      //console.log("Componente", discapacidades);
      this.discapacidad = discapacidades;
      this.loadingDiscapacidades = false;
      this._subscriptions.push(discapacidades);
    } catch (error) {
      console.log(error);
    }
  }

  async approved() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach((ctrl) =>
            ctrl.markAsTouched()
          );
        else control.markAsTouched();
      });
    }

    let data = {
      tipoDiscapacidad: this.form.controls.tipoDiscapacidad.value,
      descripcion: this.form.controls.descripcion.value,
    };
    await this.discapacidadesService.registrarDiscapacidad(data).subscribe(
      (result) => {
        this.discapacidadesService.emitEvent(true);
        this.display = false;
        this.form.reset();
        Swal.fire({
          icon: "success",
          title: "Se ah registrado correctamente",
          showConfirmButton: true,
        });
      },
      (error) => {
        console.log(error);
        Swal.showValidationMessage(`Request failed: Error inesperado`);
      }
    );
  }
  public isInvalid(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }

  private async loadData(id) {
    this.id = id;
    let compSub = await this.discapacidadesService
      .editarDiscapacidad(id)
      .subscribe((res) => {
        this.discapacidad1 = res;
        this.nombre11 = this.discapacidad1.tipoDiscapacidad;
        this.descripcion11 = this.discapacidad1.descripcion;
        
      });
  }
  public async editarDiscapaciodas() {
    let data = {
      id: this.id,
      tipoDiscapacidad: this.nombre11,
      descripcion: this.descripcion11,
    };

    await this.discapacidadesService.guardarEditarDiscapacidad(data).subscribe(
      (result) => {
        this.discapacidadesService.emitEvent(true);
        Swal.fire({
          icon: "success",
          title: "Discapacidad Actualizada",
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
