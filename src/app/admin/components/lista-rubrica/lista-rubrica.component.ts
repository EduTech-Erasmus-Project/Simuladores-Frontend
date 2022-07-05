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

  public calificacion: number = 0;
  public indicador: string = "";

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

    let data: any = {
      calificacion: this.calificacion,
      indicador: this.indicador,
      ejercitario_id: this.id
    }
    // console.log(this.rid, data);
    if (this.rid != 0) {
      data = { id: this.rid, ...data }
      console.warn(1, data);
        this.rubricaService.editarRubrica(data)
          .subscribe(res => {
            this.rubricaService.emitEvent(true);
            this.display = false;
            this.rid = 0;
            this.calificacion = 0;
            this.indicador = "";
            Swal.fire({
              icon: 'success', title: 'Se edito correctamente', showConfirmButton: true,
            });
          });
    } else {
      console.warn(2, data);
        this.rubricaService.registroRubrica(data).subscribe
          (result => {
            this.rubricaService.emitEvent(true);
            this.display = false;
            this.calificacion = 0;
            this.indicador = "";
            Swal.fire({
              icon: 'success', title: 'Se registro correctamente', showConfirmButton: true,
            });
          }, error => {
            console.log(error);
            Swal.showValidationMessage(`Request failed: Error inesperado`)
          })

    }
  }
}










