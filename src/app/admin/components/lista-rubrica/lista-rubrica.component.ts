import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Rubrica } from "src/app/core/interfaces/rubrica";
import { RubricaService } from "src/app/service/rubrica.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-lista-rubrica",
  templateUrl: "./lista-rubrica.component.html",
  styleUrls: ["./lista-rubrica.component.scss"],
})
export class ListaRubricaComponent implements OnInit {
  public form: FormGroup;
  private _subscriptions: Subscription[] = [];

  // public rubrica: any;
  public usuario: any;

  public displayMaximizable: boolean;
  public display = false;
  public id: any;
  public selectedId: number = 0;
  public editing: boolean = false;

  public rubricaData: any;
  
  public rubricas: Rubrica[] = [];
  public rubrica: Rubrica;
  
  public loadingRubrica = false;
  


  constructor(
    private rubricaService: RubricaService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = Number(this.activateRoute.snapshot.paramMap.get("id"));
    if(!this.id || isNaN(this.id)){
      this.router.navigate(["dashboard/lista-rubrica"]);
    }
    this.loadRubrica();
    this.form = this.fb.group({
      id:[null],
      calificacion: ["", Validators.required],
      indicador: ["", Validators.required],
      ejercitario_id: [null]
    });
  }

  private async loadRubrica() {
    // this.loadingPregunta = true;
    
    await this.rubricaService.obtenerListaRubrica(this.id).subscribe((res) => {
      this.rubricas = res;
      //console.log(res);
    });
  }

  public async showModal(usuario1) {
    this.usuario = usuario1;
    try {
      //console.log(this.usuario);
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }
  }

  private markAsTouched(){
    Object.values(this.form.controls).forEach((control) => {
      if (control instanceof FormGroup)
        Object.values(control.controls).forEach((ctrl) =>
          ctrl.markAsTouched()
        );
      else control.markAsTouched();
    });
  }

  public async guardar() {
    if (this.form.invalid) {
      this.markAsTouched();
      return;
    }
    //console.log(this.form.value);
    if (this.form.get("id")?.value != null) {
      await this.rubricaService.editarRubrica(this.form.value).subscribe((res) => {
        this.form.reset();
        this.loadRubrica();
        this.display=false; 
        Swal.fire({
          icon: "success",
          title: "Se edito correctamente",
          showConfirmButton: true,
        });
        //this.router.navigate(["dashboard/lista-rubrica", this.rid]);
      }, error => {
        console.log(error);
        Swal.showValidationMessage(`Request failed: Error inesperado`);
      });
    } else {
      await this.rubricaService.registroRubrica(this.form.value).subscribe(
        (result) => {
          this.form.reset();
          this.loadRubrica();
          this.display = false;
          Swal.fire({
            icon: "success",
            title: "Se registro correctamente",
            showConfirmButton: true,
          });
        },
        (error) => {
          console.log(error);
          Swal.showValidationMessage(`Request failed: Error inesperado`);
        }
      );
    }
  }
  public isInvalid(input: string) {
    return this.form.get(input).invalid && this.form.get(input).touched;
  }

  eliminarRubrica(id: number) {
    this.rubricaService.eliminarRubrica(id).subscribe((respuesta) => {
      if (respuesta) {
        this.rubricas = this.rubricas.filter((ar) => ar.id != id);
        //console.log(respuesta);
      } else {
        delete this.rubrica[id];
      }
    });
  }

  public editarRubrica(rubrica:any){
    //console.log(rubrica);
    this.form.reset();
    this.form.patchValue(rubrica);
    this.display=true; 
  }

  public nuevaRubrica(){
    this.form.reset();
    this.form.get("ejercitario_id").setValue(this.id);
    this.display=true; 
  }
}


