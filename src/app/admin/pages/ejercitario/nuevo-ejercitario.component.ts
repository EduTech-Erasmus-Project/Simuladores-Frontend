import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { Message, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { User } from "src/app/core/interfaces/User";
import { AuthService } from "src/app/service/auth.service";
import { BreadcrumbService } from "src/app/service/breadcrumb.service";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
  selector: 'app-nuevo-ejercitario',
  templateUrl: './nuevo-ejercitario.component.html',
  styleUrls: ['./nuevo-ejercitario.component.scss'],
  providers: [MessageService]
})
export class NuevoEjercitarioComponent implements OnInit {
  public user?: User;
  public form?: FormGroup;
  private _subscriptions: Subscription[] = [];
  public loader = false;
  public msg: Message[];


  public nivels = [
    {
      name: "Nivel 1",
      value: "Nivel 1",
    },
    {
      name: "Nivel 2",
      value: "Nivel 2",
    },
    {
      name: "Nivel 3",
      value: "Nivel 3",
    },
  ];

  public competencias = [
    {
      name: "Comeptencia 1",
      value: "Comeptencia 1",
    },
    {
      name: "Comeptencia 2",
      value: "Comeptencia 2",
    },
    {
      name: "Comeptencia 3",
      value: "Comeptencia 3",
    },
  ];

  files: File[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'File', routerLink: ['/uikit/file'] }

    ]);

    this.createForm();
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadData();
    // this.getParams();
  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private createForm() {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      numeroejercitario: [null, Validators.required],
      tipoejercitario: [null, Validators.required],
      duracion: [null, Validators.required],
      principalcompetencia: [null, Validators.required],
      nivel: [null, Validators.required],
      competencia: [null, Validators.required],

    });
  }

  async loadData() {

  }

  // private getParams() {
    // const id = this.route.snapshot.paramMap.get('id');
    // console.warn(id);
  // }


  public onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      this.loader = true;
      this.msg = [];
      let data = this.form.value;
      let sub = this.usuarioService.editarPerfil(data).subscribe(
        (res: any) => {
          console.log("res", res);
          this.authService.user = {
            ...this.authService.user,
            ...res,
          }
          this.msg = [
            {
              severity: "success",
              detail: "Perfil actualizado correctamente",
            },
          ];
          this.loader = false;
        },
        (error) => {
          this.msg = [
            {
              severity: "error",
              detail:
                "Error al actualizar el perfil intente de nuevo mas tarde",
            },
          ];
          console.log("error", error);
          this.loader = false;
        }
      );

      this._subscriptions.push(sub);
    }
  }

  public getErrorRequired(field: string) {
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
