import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
//import * as moment from "moment";
//import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { CompetenciaService } from "src/app/service/competencia.service";
import { EjercitarioService } from "src/app/service/ejercitario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-nuevo-ejercitario",
  templateUrl: "./nuevo-ejercitario.component.html",
  styleUrls: ["./nuevo-ejercitario.component.scss"],
  //providers: [MessageService],
})
export class NuevoEjercitarioComponent implements OnInit {
  //public user?: User;
  public form?: FormGroup;
  //public formData: FormData;
  private _subscriptions: Subscription[] = [];
  //public loader = false;
  //public msg: Message[];
  public id: number;
  //public title: string = "";
  public archivo: File;
  //public competencia: CompetenciaService;
  //public display = false;
  public porcentaje: number = 0;
  public isLoading: boolean = false;

  public nivels = [
    {
      name: "Nivel 1",
      value: "Nivel1",
    },
    {
      name: "Nivel 2",
      value: "Nivel2",
    },
    {
      name: "Nivel 3",
      value: "Nivel3",
    },
  ];

  public competencias: any[];

  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private messageService: MessageService,
    private ejercitarioService: EjercitarioService,
    private competenciaService: CompetenciaService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if (this.id != 0) {
      this.loadData();
    }

    this.createForm();
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadCompetencias();
  }

  async loadCompetencias() {
    await this.competenciaService
      .obtenerListaCompetencias()
      .subscribe((dados) => {
        this.competencias = dados.map((item) => ({
          name: item["titulo"],
          value: item["id"],
        }));
      }, error => {
        console.log(error);
      });
  }

  onSelect(event) {
    //console.warn(event);
    const file = event.addedFiles[0];
    this.archivo = file;
    this.porcentaje = 0;
  }

  onRemove(event) {
    //console.log(event);
    this.archivo = null;
    // this.files.splice(this.files.indexOf(event), 1);
  }

  private createForm() {
    this.form = this.fb.group({
      tipoDeEjercitario: [null, Validators.required],
      nombreDeEjercitario: [null, Validators.required],
      instruccionPrincipalEjercitario: [null, Validators.required],
      variaciones: [null],
      duracion: [0, Validators.required],
      instruccionesParticipantes: [null, Validators.required],
      nivel: [null, Validators.required],
      categoria: [null],
      sector: [null],
      urlEjercitario: [{value: null, disabled: true}],
      competencia: [null, Validators.required],
    });
  }

  async loadData() {
    await this.ejercitarioService.obtenerEjercitario(this.id).subscribe(
      (res) => {
        //console.log("res data", res);
        this.form.patchValue(res);
      },
      (error) => {
        //console.log(error);
        this.router.navigate(["/dashboard/simuladores"]);
      }
    );
  }

  public async onSubmit() {
    this.markTouchForm();
    //if (!this.archivo) return;

    //console.log(this.form.value);
    if (this.form.valid) {
      //this.display = false;
      // this.loader = true;
      //this.msg = [];
      const data = this.form.value;
      //console.warn(data);
      this.isLoading = true;
      if (this.id && this.id != 0) {
        //console.log("update", data);
        let sub = await this.ejercitarioService
          .editarEjercitario(data, this.id)
          .subscribe(
            (response) => {
              //console.log(response);
              this.isLoading = false;
              Swal.fire({
                icon: "success",
                title: "Se actualizo correctamente",
                showConfirmButton: true,
              });
              this.router.navigate(['dashboard/simuladores']);
            },
            (err) => {
              this.isLoading = false;
              Swal.fire({
                icon: "error",
                title: "Ocurrio un error",
                showConfirmButton: true,
              });
            }
          );
        this._subscriptions.push(sub);
      } else {
        let sub = this.ejercitarioService
          .registroEjercitario({ file: this.archivo, ...this.form.value })
          .subscribe({
            next: (response:any) => {
  
              if (response.ok) {
                this.porcentaje = 100;
                Swal.fire({
                  icon: "success",
                  title: "Se registro correctamente",
                  showConfirmButton: true,
                });
                this.router.navigate(['dashboard/simuladores']);
              } else {
                this.porcentaje = Number(((response.loaded / response.total) * 100).toFixed(2));
            
              }
            },
            error: (e) => {
              this.isLoading = false;
              this.porcentaje = 0;
              console.error(e);
              Swal.fire({
                icon: "error",
                title: "Ocurrio un error",
                showConfirmButton: true,
              });
            },
            complete: () => {
              this.isLoading = false;
              this.archivo = null;
              this.porcentaje = 0;
            },
          });
      }
    }
  }

  public getErrorRequired(field: string) {
    return (
      this.form.get(field).hasError("required") && this.form.get(field).touched
    );
  }

  private markTouchForm() {
    (<any>Object).values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
