import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { PreguntaService } from 'src/app/service/pregunta.service';
import Swal from "sweetalert2";
import * as moment from "moment";
import { Subscription } from 'rxjs';
import { RubricaService } from 'src/app/service/rubrica.service';
@Component({
  selector: 'app-editar-rubrica',
  templateUrl: './editar-rubrica.component.html',
  styleUrls: ['./editar-rubrica.component.scss']
})
export class EditarRubricaComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    calificacion: ['', Validators.required],
    indicador: ['', Validators.required]
  });
  public formData: FormData;
  public loader = false;
  public rubricaData: any;
  public eid: number;
  public rid: number;
  public displayMaximizable: boolean;
  public display = false;
  public msg: Message[];
  public idRubrica: number;
  private _subscriptions: Subscription[] = [];

  constructor(private rubricaService: RubricaService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadRubrica();
  }

  private loadRubrica() {
    // this.loadingPregunta = true;

    this.eid = Number(this.activateRoute.snapshot.paramMap.get('eid'));
    this.rid = Number(this.activateRoute.snapshot.paramMap.get('rid'));
    this.rubricaService.obtenerRubrica(this.rid)
      .subscribe(res => {
        this.rubricaData = res;
        this.form.patchValue({
          calificacion: this.rubricaData['calificacion'],
          indicador: this.rubricaData['indicador'],
        });
      });

  
  }

  public onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      this.display = false;
      this.loader = true;
      this.msg = [];
      const id = this.idRubrica;
      const calificacion = this.form.controls.calificacion.value;
      const indicador = this.form.controls.indicador.value;
      const data = { ...this.rubricaData, calificacion: calificacion, indicador: indicador };
      console.warn(data);
      if (this.idRubrica && this.idRubrica != 0) {
        let sub = this.rubricaService.editarRubrica(data)
          .subscribe(response => {
            //console.log(response);
            Swal.fire({
              icon: 'success', title: 'Se actualizo correctamente', showConfirmButton: true,
            });
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


  get years() {
    return `${moment().year() - 50}:${moment().year() - 10}`;
  }

  private markTouchForm() {
    (<any>Object).values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

}
