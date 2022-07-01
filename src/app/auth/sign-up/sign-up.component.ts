import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { Message } from "primeng/api";
import * as moment from "moment";
import { AuthService } from "src/app/service/auth.service";
import { DiscapacidadesService } from "src/app/service/discapacidades.service";
import { Discapacidad } from "src/core/interfaces/discapacidad";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private subscribes: Subscription[] = [];
  public registred: boolean = false;
  public code: string;
  public form: FormGroup;
  public show: boolean = false;
  public msgs: Message[];
  public discapacidadesArray: any[];
  public validateCode:boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private discapacidadesService: DiscapacidadesService,
    
  ) {
    this.route.queryParams.subscribe((params) => {
      //console.log(params);
      this.code = params.code;
    });
  }
  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.createForm();
    this.loadData();
    // this.msgs = [
    //   { severity: "error", summary: "Error", detail: "Message Content" },
    // ];
  }

  async loadData() {
    let sub = await this.discapacidadesService
      .obtenerDiscapacidades()
      .subscribe((results: any) => {
        this.discapacidadesArray = results.discapacidades.map((results) => {
          return {
            name: results.tipoDiscapacidad,
            code: results.id,
          };
        });
        //console.log(this.discapacidades);
      });
    this.subscribes.push(sub);
  }

  createForm() {
    this.form = this.fb.group({
      nombre: [
        null,
        [Validators.required, Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚs]+")],
      ],
      apellido: [
        null,
        [Validators.required, Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚs]+")],
      ],
      role: ["user", Validators.required],
      institucion: [''],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            "^([a-zA-Z0-9_' - '.]+)@([a-zA-Z0-9_' - '.]+).([a-zA-Z]{2,5})$"
          ),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          // Validators.pattern(
          //   `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{10,50}$`
          // ),
        ],
      ],
      terms: [false, [Validators.required, this.termsValidation()]],
      disability: [false],
      fechaNacimiento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      discapacidades: this.fb.array([]),
      codigo:[{value:this.code, disabled:this.code }, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    });
  }

  changeDiscapacidad(evt) {
    if (evt.checked) {
      this.addDiscapacidad();
    } else {
      this.form.controls["discapacidades"] = this.fb.array([]);
    }
  }

  termsValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      return !value ? { terms: true } : null;
    };
  }

  markTouchForm() {
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

  public get discapacidades(): any {
    return this.form.controls["discapacidades"]
      ? (this.form.controls["discapacidades"] as FormArray)
      : [];
  }

  addDiscapacidad() {
    if (this.discapacidades.invalid) {
      this.markAsTouchFormArray();
      return;
    }
    let formItem = this.fb.group({
      code: [null, Validators.required],
      grado: [null, Validators.required],
    });
    //console.log(this.discapacidades);
    this.discapacidades.push(formItem);
  }

  removeDiscapacidad(index) {
    //console.log(this.discapacidades.length);
    if (this.discapacidades.length <= 1) {
      this.form.get("disability").setValue(false);
    }
    this.discapacidades.removeAt(index);
  }

  async onSave() {
    this.msgs = [];
    if(
    this.getErrorMaxLength('codigo') ||
    this.getErrorMinLength('codigo') ||  
    this.validateCode){
      this.msgs = [
        {
          severity: "error",
          summary: "Error",
          detail: "Necesita ingresar un código de docente valido.",
        },
      ];
    }
    this.markAsTouchFormArray();
    this.markTouchForm();
    if (this.form.valid) {
      
      let data = this.form.value;
      data.codigo = this.form.get("codigo").value;
      data.fechaNacimiento = moment(data.fechaNacimiento).format("YYYY-MM-DD");
     
      let sub = await this.authService.register(data).subscribe(
      
        (results) => {
          //console.log(results);
          this.registred = true;
        },
        (err) => {
          console.log("err", err);
          if (err.error?.email &&
            err.error?.email[0]?.includes(
              "usuario with this email already exists."
            )
          ) {
            this.msgs = [
              {
                severity: "error",
                summary: "Error",
                detail: "El email ya esta registrado.",
              },
            ];
            return;
          }
          

          this.msgs = [
            {
              severity: "error",
              summary: "Error",
              detail: "Error al registrar intente de nuevo mas tarde.",
            },
          ];
        }
      );
      
      this.subscribes.push(sub);
    }
  }

  get years() {
    return `${moment().year() - 50}:${moment().year() - 10}`;
  }

  getErrorTerms(field: string) {
    return (
      this.form.get(field).hasError("terms") && this.form.get(field).touched
    );
  }
  getErrorRequired(field: string) {
    return (
      this.form.get(field).hasError("required") && this.form.get(field).touched
    );
  }

  getErrorPattern(field: string) {
    return (
      this.form.get(field).hasError("pattern") && this.form.get(field).touched
    );
  }

  getErrorMaxLength(field:string){
    return (
      this.form.get(field).hasError("maxlength") && this.form.get(field).touched
    );
  }

  getErrorMinLength(field:string){
    return (
      this.form.get(field).hasError("minlength") && this.form.get(field).touched
    );
  }

  public getArrayErrorRequired(idx: number, field: string) {
    return (
      this.discapacidades.at(idx).get(field)?.hasError("required") &&
      this.discapacidades.at(idx).get(field)?.touched
    );
  }

  onChangeRole() {
    if (this.code) return;
    if(this.form.get("role").value === "expert"){
      this.form.controls['codigo'].disable();
      this.form.controls['codigo'].setValue(null);
    }else{
      this.form.controls['codigo'].enable();
    }
  }
}
