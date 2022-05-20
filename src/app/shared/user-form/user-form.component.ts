import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/core/interfaces/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  public form?: FormGroup;
  public estadoCivil: any[] = [
    {
      name: "Soltero",
      value: "Soltero",
    },
    {
      name: "Casado",
      value: "Casado",
    },
    {
      name: "Divorciado",
      value: "Divorciado",
    },
    {
      name: "Viudo",
      value: "Viudo",
    },
  ];

  public generos = [
    {
      name: "Hombre",
      value: "Hombre",
    },
    {
      name: "Mujer",
      value: "Mujer",
    },
    {
      name: "LGBT",
      value: "LGBT",
    },
  ];

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.form = this.fb.group({
      nombre: [this.user?.nombre, Validators.required],
      apellido: [this.user?.apellido, Validators.required],
      direccion: [this.user?.direccion, Validators.required],
      telefono: [this.user?.telefono, Validators.required],
      fechaNacimiento: [this.user?.fechaNacimiento, Validators.required],
      pais: [this.user?.pais, Validators.required],
      ciudad: [this.user?.ciudad, Validators.required],
      genero: [this.user?.genero, Validators.required],
      nivelDeFormacion: [this.user?.nivelDeFormacion],
      carreraUniversitaria: [this.user?.carreraUniversitaria],
      numeroDeHijos: [this.user?.numeroDeHijos || 0],
      estadoCivil: [this.user?.estadoCivil],
      etnia: [this.user?.etnia],
      estudiosPrevios: [this.user?.estudiosPrevios],
    });
   
  }

  onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      console.log("Form submit");
    }
  }

  

  getErrorRequired(field: string) {
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
