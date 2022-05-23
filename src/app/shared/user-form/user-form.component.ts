import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { forkJoin, Subscription } from "rxjs";
import { User } from "src/app/core/interfaces/User";
import { DiscapacidadesService } from "src/app/service/discapacidades.service";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit, OnDestroy {
  public user?: User;
  public form?: FormGroup;
  private _subscriptions: Subscription[] = [];
  public discapacidadesArray: any[];
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

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private discapacidadesService: DiscapacidadesService
  ) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadData();
  }

  private createForm() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      pais: [null, Validators.required],
      ciudad: [null, Validators.required],
      genero: [null, Validators.required],
      nivelDeFormacion: [null],
      carreraUniversitaria: [null],
      numeroDeHijos: [0],
      estadoCivil: [null],
      etnia: [null],
      estudiosPrevios: [null],
      discapacidades: this.fb.array([]),
      disability: [false],
    });
  }

  async loadData() {
    let sub = await forkJoin([
      this.discapacidadesService.obtenerDiscapacidades(),
      this.usuarioService.getPerfil(),
    ]).subscribe(
      ([discapacidades, user]) => {
        console.log(discapacidades, user);
        this.discapacidadesArray = discapacidades.discapacidades.map(
          (results) => {
            return {
              name: results.tipoDiscapacidad,
              id: results.id,
            };
          }
        );
        this.user = user;
        this.form.patchValue({
          ...user,
          discapacidades: [],
        });
        if (user.discapacidades && user.discapacidades?.length > 0) {
          this.form.get("disability").setValue(true);
          user.discapacidades.forEach((discapacidad) => {
            this.addDiscapacidad(discapacidad);
          });
        }
      },
      (error) => console.log(error)
    );
    this._subscriptions.push(sub);
  }

  public changeDiscapacidad(evt) {
    if (evt.checked) {
      this.addDiscapacidad();
    } else {
      this.form.controls["discapacidades"] = this.fb.array([]);
    }
  }

  public get discapacidades(): any {
    return this.form.controls["discapacidades"]
      ? (this.form.controls["discapacidades"] as FormArray)
      : [];
  }

  addDiscapacidad(discapacidad: any = null) {
    if (this.discapacidades.invalid) {
      this.markAsTouchFormArray();
      return;
    }
    let formItem = this.fb.group({
      id: [discapacidad?.discapacidad_id, Validators.required],
      grado: [discapacidad?.gradoDeDiscapacidad, Validators.required],
    });
    this.discapacidades.push(formItem);
  }

  removeDiscapacidad(index) {
    this.discapacidades.removeAt(index);
  }

  public onSubmit() {
    this.markTouchForm();
    this.markAsTouchFormArray();
    if (this.form.valid) {
      console.log("Form submit", this.form.value);
    }
  }

  public getErrorRequired(field: string) {
    return (
      this.form.get(field).hasError("required") && this.form.get(field).touched
    );
  }

  public getArrayErrorRequired(idx: number, field: string) {
    return (
      this.discapacidades.at(idx).get(field)?.hasError("required") &&
      this.discapacidades.at(idx).get(field)?.touched
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

  private markAsTouchFormArray() {
    this.discapacidades.controls.forEach((control) => {
      (<any>Object).values(control.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    });
  }
}
