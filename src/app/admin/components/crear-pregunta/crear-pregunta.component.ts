import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { PreguntaService } from 'src/app/service/pregunta.service';
import Swal from "sweetalert2";
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.scss'],
  providers: [MessageService]
})
export class CrearPreguntaComponent implements OnInit {
  public form?: FormGroup;
  public userForm: FormGroup;
  public loader = false;
  public msg: Message[];
  public id: number;



  constructor(
    private pregunta: PreguntaService,
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      questions: this._fb.array([this.addQuestionGroup()])
    });
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  //Append Fields Set
  private addQuestionGroup(): FormGroup {
    return this._fb.group({
      numeroPregunta: [],
      contenido: [],
      respuestaCorrecta: [],
      preguntaDelEjercitario: [],

    });
  }
  //Add Fields
  addQuestion(): void {
    this.questionsArray.push(this.addQuestionGroup());
  }


  //Remove Fields
  removeQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }
  //Fields Array
  get questionsArray(): FormArray {
    return <FormArray>this.userForm.get('questions');
  }

  public isInvalid(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }
  public onSubmit() {

    this.markTouchForm();
    if (this.userForm.valid) {
      this.loader = true;
      this.msg = [];
      let { questions } = this.userForm.value;
      const questionsList: any[] = questions.map((q, i) => ({ ...q, numeroPregunta: i + 1, preguntaDelEjercitario: this.id }))
      let complete = false;
      for (const question of questionsList) {
        // const data = { id: this.id, ...question };
        //console.warn(data);

        if (this.id && this.id != 0) {
          let sub = this.pregunta.registroPregunta(question)
            .pipe(delay(500))
            .subscribe({
              next: response => {
                console.log(response);
              },
              error: e => console.error(e),
              complete: () => {
                console.warn('Completado!!!');
                const index = questionsList.indexOf(question);
                complete = (questionsList[index] === questionsList[questionsList.length - 1]);
                console.info(questionsList[index], questionsList[questionsList.length - 1], complete);
                if (complete) {
                  Swal.fire({
                    icon: 'success', title: 'Se Registro correctamente', showConfirmButton: true,
                  });
                  this.router.navigate(['dashboard/lista-pregunta', this.id]);
                }
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
  public getErrorRequired(field: string) {
    return (
      this.form.get(field).hasError("required") && this.form.get(field).touched
    );



  }
}