import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/api";
import { PreguntaService } from "src/app/service/pregunta.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { Subscription } from "rxjs";

@Component({
  selector: "app-editar-pregunta",
  templateUrl: "./editar-pregunta.component.html",
  styleUrls: ["./editar-pregunta.component.scss"],
})
export class EditarPreguntaComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    id: [null],
    contenido: [null, Validators.required],
    respuestaCorrecta: [null, Validators.required],
    preguntaDelEjercitario: [null],
    numeroPregunta: [null],
  });
  public formData: FormData;
  public loader = false;
  //public preguntaData: any;

  //public displayMaximizable: boolean;
  public display = false;
  public msg: Message[];
  public eid: number;
  public pid: number;
  private _subscriptions: Subscription[] = [];

  constructor(
    private preguntaService: PreguntaService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPregunta();
  }

  private loadPregunta() {
    // this.loadingPregunta = true;
    this.eid = Number(this.activateRoute.snapshot.paramMap.get("eid"));
    this.pid = Number(this.activateRoute.snapshot.paramMap.get("pid"));
    this.loadData();
  }

  private async loadData() {
    let sub = await this.preguntaService
      .recuperarPreguntaEjercitario(this.pid)
      .subscribe((res) => {
        //this.preguntaData = res;
        console.log(res);
        this.form.patchValue(res);
      });
    this._subscriptions.push(sub);
  }

  public onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      //this.display = false;
      this.loader = true;
      this.msg = [];
      // const id = this.pid;
      // const pregunta = this.form.controls.pregunta.value;
      // const respuesta = this.form.controls.respuesta.value;
      // const data = { ...this.preguntaData, contenido: pregunta, respuestaCorrecta: respuesta };
      //console.warn(data);
      if (this.pid && this.pid != 0) {
        let sub = this.preguntaService
          .editarPregunta(this.form.value)
          .subscribe((response) => {
            //console.log(response);
            Swal.fire({
              icon: "success",
              title: "Se actualizo correctamente",
              showConfirmButton: true,
            });
            this.router.navigate(["dashboard/lista-pregunta", this.eid]);
          });
        this._subscriptions.push(sub);
      }
    }
  }
  public getErrorRequired(field: string) {
    return (
      this.form.get(field).hasError("required") && this.form.get(field).touched
    );
  }

  // get years() {
  //   return `${moment().year() - 50}:${moment().year() - 10}`;
  // }

  private markTouchForm() {
    (<any>Object).values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
