import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { PreguntaService } from 'src/app/service/pregunta.service';
import Swal from "sweetalert2";
import { delay } from 'rxjs/operators';
import { RubricaService } from 'src/app/service/rubrica.service';
@Component({
  selector: 'app-crear-rubrica',
  templateUrl: './crear-rubrica.component.html',
  styleUrls: ['./crear-rubrica.component.scss']
})
export class CrearRubricaComponent implements OnInit {

  public userForm: FormGroup;
  public loader = false;
  public msg: Message[];
  public id: number;


  constructor(
    private rubrica: RubricaService,
    private route: ActivatedRoute,
    private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      questions: this._fb.array([this.addRubricaGroup()])
    });
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  //Append Fields Set
  private addRubricaGroup(): FormGroup {
    return this._fb.group({
      calificacion: [],
      indicador: [],
      ejercitarioRubrica: [],

    });
  }
  //Add Fields
  addRubrica(): void {
    this.rubricaArray.push(this.addRubricaGroup());
  }


  //Remove Fields
  removeRubrica(index: number): void {
    this.rubricaArray.removeAt(index);
  }
  //Fields Array
  get rubricaArray(): FormArray {
    return <FormArray>this.userForm.get('rubrica');
  }

  public onSubmit() {

    this.markTouchForm();
    if (this.userForm.valid) {
      this.loader = true;
      this.msg = [];
      let { rubrica } = this.userForm.value;
      const rubricaList: any[] = rubrica.map((q, i) => ({ ...q, calificacion: i + 1, ejercitarioRubrica: this.id }))
      let complete = false;
      for (const rubrica of rubricaList) {
        // const data = { id: this.id, ...question };
        //console.warn(data);

        if (this.id && this.id != 0) {
          let sub = this.rubrica.registroRubrica(rubrica)
            .pipe(delay(500))
            .subscribe({
              next: response => {
                console.log(response);
              },
              error: e => console.error(e),
              complete: () => {
                console.warn('Completado!!!');
                const index = rubricaList.indexOf(rubrica);
                complete = (rubricaList[index] === rubricaList[rubricaList.length - 1]);
                console.info(rubricaList[index], rubricaList[rubricaList.length - 1], complete);
                if (complete)
                  Swal.fire({
                    icon: 'success', title: 'Se Registro correctamente', showConfirmButton: true,
                  });
              },
            });

        }
      }
    }
  }

  private markTouchForm() {
    (<any>Object).values(this.userForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }


}