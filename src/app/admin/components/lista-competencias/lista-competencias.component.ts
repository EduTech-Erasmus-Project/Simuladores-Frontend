import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Competencia } from 'src/app/core/interfaces/Competencia';
import { CompetenciaService } from "src/app/service/competencia.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-competencias',
  templateUrl: './lista-competencias.component.html',
  styleUrls: ['./lista-competencias.component.scss']
})
export class ListaCompetenciasComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingCompetencia = false;
  public competencia: any;
  public display = false;
  private nombre11: string;
  private descripcion11: string;
  public competencia1: Competencia;
  private id: number;
  
  public form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
  });




  constructor(private competenciaService: CompetenciaService, private fb: FormBuilder) { }



  ngOnInit(): void {

    this.loadParticipantes();
    this.competenciaService.event.subscribe(result => { console.log("hola", result); this.loadParticipantes() })

  }




  private async loadParticipantes() {
    this.loadingCompetencia = true;
    try {
      const competencias = await this.competenciaService.obtenerListaCompetencias().toPromise();
      console.log("Componente", competencias);
      this.competencia = competencias;
      this.loadingCompetencia = false;
      this._subscriptions.push(competencias);
    } catch (error) {
      console.log(error);
    }
  }

  async approved() {

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }

    let data = {
      titulo: this.form.controls.titulo.value,
      descripcion: this.form.controls.descripcion.value
    }
    await this.competenciaService.registrarCompetencia(data).subscribe(result => {
      this.competenciaService.emitEvent(true);
      this.display = false;
      this.form.reset();
      Swal.fire({ icon: 'success', title: 'Se ah registrado correctamente', showConfirmButton: true, })

    }, error => {
      console.log(error);
      Swal.showValidationMessage(`Request failed: Error inesperado`)
    })

  }

  public isInvalid(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }

  private async loadData(id) {
    this.id = id
    let compSub = await this.competenciaService.editarCompetencia(id).subscribe((res) => {
      this.competencia1 = res;
      this.nombre11 = this.competencia1.titulo;
      this.descripcion11 = this.competencia1.descripcion;
      console.log("nombre  ===>   ", this.nombre11, "descripcion  ===> ", this.descripcion11)
    });

  }
  public async editarCompetencia() {
    let data = {
      id: this.id,
      titulo: this.nombre11,
      descripcion: this.descripcion11
    }
    await this.competenciaService.guardarEditarCompetencia(data).subscribe(result => {
      this.competenciaService.emitEvent(true);
      this.display = false;
      Swal.fire({ icon: 'success', title: 'Competencia Actualizada', showConfirmButton: true, })

    }, error => {
      console.log(error);
      Swal.showValidationMessage(`Request failed: Error inesperado`)
    })

  }


}
