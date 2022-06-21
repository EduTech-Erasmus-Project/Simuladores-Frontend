import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PreguntaService } from 'src/app/service/pregunta.service';
import Swal from "sweetalert2";
import * as moment from "moment";
@Component({
  selector: 'app-lista-pregunta',
  templateUrl: './lista-pregunta.component.html',
  styleUrls: ['./lista-pregunta.component.scss']
})
export class ListaPreguntaComponent implements OnInit {
  public form?: FormGroup;
  public formData: FormData;
  public loadingPregunta = false;
  public pregunta: any;
  public loader = false;

  private _subscriptions: Subscription[] = [];
  public msg: Message[];
  public id: number;
  public displayMaximizable: boolean;
  public display = false;
  public usuario: any;

  constructor(private preguntaService: PreguntaService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.loadPregunta();
    this.preguntaService.event.subscribe(result => { console.log("hola", result); this.loadPregunta() })

  }

  private loadPregunta() {
    this.loadingPregunta = true;
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.preguntaService.obtenerListaPregunta(this.id)
      .subscribe(res => {
        this.pregunta = res;
      });

  }

  public async showModal(usuario1) {
    this.usuario = usuario1
    try {
      console.log(this.usuario);
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }

  }
  public onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      this.display = false;
      this.loader = true;
      this.msg = [];
      const id = this.id;
      const data = { id, ...this.form.value };
      console.warn(data);
      if (this.id && this.id != 0) {      
        let sub = this.preguntaService.registroPregunta({ ...this.form.value })
          .subscribe(response => {
            Swal.fire({
              icon: 'success', title: 'Se registro correctamente', showConfirmButton: true,
            });
            console.log(response)
          })
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
