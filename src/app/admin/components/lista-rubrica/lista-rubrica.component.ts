import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { Subscriber, Subscription } from 'rxjs';
import { Ejercitario } from 'src/app/core/interfaces/Ejercitario';
import { Rubrica } from 'src/app/core/interfaces/rubrica';
import { EjercitarioService } from 'src/app/service/ejercitario.service';
import { RubricaService } from 'src/app/service/rubrica.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-rubrica',
  templateUrl: './lista-rubrica.component.html',
  styleUrls: ['./lista-rubrica.component.scss']
})
export class ListaRubricaComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    calificacion: ['', Validators.required],
    indicador: ['', Validators.required]
  });
  private _subscriptions: Subscription[] = [];

  // public rubrica: any;
  public usuario: any;



  public displayMaximizable: boolean;
  public display = false;
  public id: any;
  public selectedId: number = 0;
  public editing: boolean = false;

  public rid: number = 0;
  public rubricaData: any;


  public rubricas: Rubrica[] = [];
  public rubrica: Rubrica;

  public loadingRubrica = false;

  constructor(private rubricaService: RubricaService, private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute) {

  }
  ngOnInit(): void {


    this.loadRubrica();
    this.rubricaService.event.subscribe(result => { console.log("hola", result); this.loadRubrica() })

  }

  private loadRubrica() {
    // this.loadingPregunta = true;
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.rubricaService.obtenerListaRubrica(this.id)
      .subscribe(res => {
        this.rubricas = res;
        console.warn(res);
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

  public async guardar() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }
    let data: any = {
      calificacion: this.form.controls.calificacion.value,
      indicador: this.form.controls.indicador.value,
      ejercitario_id: this.id
    }
    console.log(this.rid, data);
    if (this.rid != 0) {
      data = { id: this.rid, ...data }
      console.warn(1, data);
      this.rubricaService.editarRubrica(data)
        .subscribe(res => {
          this.rubricaService.emitEvent(true);
          this.display = false;
          this.rid = 0;
          this.form.reset();
          Swal.fire({
            icon: 'success', title: 'Se edito correctamente', showConfirmButton: true,
          });
          this.router.navigate(['dashboard/lista-rubrica', this.rid]);
        });
    } else {
      console.warn(2, data);
      this.rubricaService.registroRubrica(data).subscribe
        (result => {
          this.rubricaService.emitEvent(true);
          this.display = false;
          this.form.reset();
          Swal.fire({
            icon: 'success', title: 'Se registro correctamente', showConfirmButton: true,
          });

        }, error => {
          console.log(error);
          Swal.showValidationMessage(`Request failed: Error inesperado`)
        })

    }
  }
  public isInvalid(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }
  eliminarRubrica(id: number) {
    this.rubricaService.eliminarRubrica(id)
      .subscribe(
        respuesta => {
          if (respuesta) {
            this.rubricas = this.rubricas.filter(ar => ar.id != id)


            console.log(respuesta);

          }
          else {
            delete this.rubrica[id];


          }
        }
      )

  }
}










