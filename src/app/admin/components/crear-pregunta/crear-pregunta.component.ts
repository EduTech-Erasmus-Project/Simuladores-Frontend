import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { PreguntaService } from 'src/app/service/pregunta.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.scss']
})
export class CrearPreguntaComponent implements OnInit {

  public userForm: FormGroup;
  public loader = false;
  public msg: Message[];
  public id: number;
 

  constructor(
    private pregunta: PreguntaService,
    private route: ActivatedRoute,
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

  public onSubmit() {

    this.markTouchForm();
    if (this.userForm.valid) {
      this.loader = true;
      this.msg = [];
      let { questions } = this.userForm.value;
      questions = questions.map((q, i) => ({ ...q, numeroPregunta: i + 1, preguntaDelEjercitario: this.id }))
      for (const question of questions) {
       // const data = { id: this.id, ...question };
        //console.warn(data);

      if (this.id && this.id != 0) {
         let sub = this.pregunta.registroPregunta(question)
           .subscribe(response => {
             console.log(response);
           });}
       

       }
    }
  }

  private markTouchForm() {
    (<any>Object).values(this.userForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
   
  
}