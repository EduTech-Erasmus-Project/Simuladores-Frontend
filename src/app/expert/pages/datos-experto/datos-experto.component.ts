import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { SelectItemGroup } from "primeng/api";
import { User } from "src/app/core/interfaces/User";

@Component({
  selector: "app-datos-experto",
  templateUrl: "./datos-experto.component.html",
  styleUrls: ["./datos-experto.component.scss"],
})
export class DatosExpertoComponent implements OnInit {
  public form?: FormGroup;
  public formPassword?: FormGroup;
  public responsable: User;
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

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerInformacionExperto();
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      nombre: [this.responsable?.nombre, Validators.required],
      apellido: [this.responsable?.apellido, Validators.required],
      direccion: [this.responsable?.direccion, Validators.required],
      telefono: [this.responsable?.telefono, Validators.required],
      fechaNacimiento: [this.responsable?.fechaNacimiento, Validators.required],
      pais: [this.responsable?.pais, Validators.required],
      ciudad: [this.responsable?.ciudad, Validators.required],
      genero: [this.responsable?.genero, Validators.required],
      nivelDeFormacion: [this.responsable?.nivelDeFormacion],
      carreraUniversitaria: [this.responsable?.carreraUniversitaria],
      numeroDeHijos: [this.responsable?.numeroDeHijos || 0],
      estadoCivil: [this.responsable?.estadoCivil],
      etnia: [this.responsable?.etnia],
      estudiosPrevios: [this.responsable?.estudiosPrevios],
    });
    this.formPassword = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
    });
  }

  obtenerInformacionExperto() {
    // this.responsableServiceInformacion
    //   .obtenerInformacionEvaluadorCorreo(this.correoResponsableDatos)
    //   .then((responsable) => {
    //     this.responsable? = responsable;
    //     this.nombreResponsable = this.responsable??.nombre;
    //     this.direccionResponsable = this.responsable?.direccion;
    //     this.nivelDeFormacionResponsable = this.responsable?.nivelDeFormacion;
    //     this.apellidoResponsable = this.responsable??.apellido;
    //     this.telefonoResponsable = this.responsable?.telefono;
    //     this.paisResponsable = this.responsable??.pais;
    //     this.ciudadResponsable = this.responsable??.ciudad;
    //   });
  }

  onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      console.log("Form submit");
    }
  }

  onSubmitPassword() {
    this.markTouchFormPassword();
    if (this.formPassword.valid) {
      console.log("Form submit");
    }
  }

  getErrorRequired(field: string) {
    return (
      this.form.get(field).hasError("required") && this.form.get(field).touched
    );
  }

  getErrorRequiredPass(field: string) {
    return (
      this.formPassword.get(field).hasError("required") &&
      this.formPassword.get(field).touched
    );
  }

  get years() {
    return `${moment().year() - 50}:${moment().year() - 10}`;
  }

  private markTouchFormPassword() {
    (<any>Object).values(this.formPassword.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private markTouchForm() {
    (<any>Object).values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

}
