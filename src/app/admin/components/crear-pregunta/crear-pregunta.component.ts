import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message, MessageService } from "primeng/api";
import { PreguntaService } from "src/app/service/pregunta.service";
import Swal from "sweetalert2";
import { delay } from "rxjs/operators";
import { Subscription } from "rxjs";
@Component({
  selector: "app-crear-pregunta",
  templateUrl: "./crear-pregunta.component.html",
  styleUrls: ["./crear-pregunta.component.scss"],
  providers: [MessageService],
})
export class CrearPreguntaComponent implements OnInit, OnDestroy {
  public form?: FormGroup;
  public userForm: FormGroup;
  public loader = false;
  public msg: Message[];
  public id: number;
  public secuencial = 1;
  private subscriptions: Subscription[] = [];

  constructor(
    private pregunta: PreguntaService,
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if (!this.id || isNaN(this.id)) {
      this.router.navigate(["dashboard/lista-pregunta"]);
    }
    this.loadData();

    this.userForm = this._fb.group({
      questions: this._fb.array([this.addQuestionGroup()]),
    });
  }

  private async loadData() {
    let sub = await this.pregunta
      .obtenerListaPregunta(this.id)
      .subscribe((res) => {
        //console.log(res);
        if (res.length > 0) {
          let max = res.reduce(
            (acc, item) =>
              (acc = acc > item.numeroPregunta ? acc : item.numeroPregunta),
            1
          );
          this.secuencial = max + 1;
        }
      });
    this.subscriptions.push(sub);
  }

  //Append Fields Set
  private addQuestionGroup(): FormGroup {
    return this._fb.group({
      numeroPregunta: [null],
      contenido: [null, Validators.required],
      respuestaCorrecta: [null, Validators.required],
      preguntaDelEjercitario: [this.id],
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
    return <FormArray>this.userForm.get("questions");
  }

  public isInvalid(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }
  public async onSubmit() {
    this.markTouchForm();
    if (this.userForm.valid) {
      this.loader = true;
      this.msg = [];
      let sub = await this.pregunta
        .registroPregunta(this.userForm.value)
        .subscribe(
          (res) => {
            this.msg.push({
              severity: "success",
              summary: "Pregunta registrada",
              detail: "Pregunta registrada correctamente",
            });
            this.router.navigate(["dashboard/lista-pregunta/" + this.id]);
          },
          (err) => {
            console.log(err);
            this.loader = false;
            this.msg.push({
              severity: "error",
              summary: "Error",
              detail: "Error al registrar la pregunta",
            });
          }
        );
      this.subscriptions.push(sub);
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
