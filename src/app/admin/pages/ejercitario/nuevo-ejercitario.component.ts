import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ActivationEnd, Data, Router } from "@angular/router";
import * as moment from "moment";
import { Message, MessageService } from "primeng/api";
import { filter, map, Observable, Subscription, zip } from "rxjs";
import { User } from "src/app/core/interfaces/User";
import { AuthService } from "src/app/service/auth.service";
import { BreadcrumbService } from "src/app/service/breadcrumb.service";
import { CompetenciaService } from "src/app/service/competencia.service";
import { EjercitarioService } from "src/app/service/ejercitario.service";
import { UsuarioService } from "src/app/service/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-nuevo-ejercitario',
  templateUrl: './nuevo-ejercitario.component.html',
  styleUrls: ['./nuevo-ejercitario.component.scss'],
  providers: [MessageService]
})
export class NuevoEjercitarioComponent implements OnInit {
  public user?: User;
  public form?: FormGroup;
  public formData: FormData;
  private _subscriptions: Subscription[] = [];
  public loader = false;
  public msg: Message[];
  public id: number;
  public title: string = '';
  public archivo: File;
  competencia: CompetenciaService
  public display = false;


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
      name: "Competencia 1",
      value: "Competencia 1",
    },
    {
      name: "Competencia 2",
      value: "Competencia 2",
    },
    {
      name: "Competencia 3",
      value: "Competencia 3",
    },
  ];

  files: File[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private authService: AuthService,
    private ejercitarioService: EjercitarioService,
    private competenciaService: CompetenciaService,


  ) {
    this.breadcrumbService.setItems([
      { label: 'UI Kit' },
      { label: 'File', routerLink: ['/uikit/file'] }

    ]);
    let sub = this.getTitle()
      .subscribe(({ title }) => {
        this.title = title;
        // document.title = title;
      });
    this._subscriptions.push(sub);
    this.createForm();
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadData();

    this.competenciaService.obtenerListaCompetencias()
      .subscribe(dados => {
        this.competencias = dados.map(item => ({ name: item['titulo'], value: item['id'] }));
        console.log(dados)
        console.warn(this.competencias);

      });
  }

  private getTitle(): Observable<Data> {
    return this.router.events
      .pipe(
        filter<any>(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
  }

  onSelect(event) {
    console.warn(event);
    const file = event.addedFiles[0];
    this.archivo = file;

  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private createForm() {
    console.log();
    this.form = this.fb.group({
      tipoDeEjercitario: [null, Validators.required],
      nombreDeEjercitario: [null, Validators.required],
      instruccionPrincipalEjercitario: [null, Validators.required],
      variaciones: [null, Validators.required],
      duracion: [null, Validators.required],
      instruccionesParticipantes: [null, Validators.required],
      nivel: [null, Validators.required],
      categoria: [null, Validators.required],
      sector: [null, Validators.required],
      competencia: [null, Validators.required],

    });
  }

  loadData() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id && this.id != 0)
      this.ejercitarioService.obtenerEjercitario(this.id).
        subscribe(res => {
          console.warn(res);
          const { nombreDeEjercitario, tipoDeEjercitario, duracion, nivel
            , competencia, categoria, sector, instruccionPrincipalEjercitario, instruccionesParticipantes, variaciones } = res;

          console.warn(nombreDeEjercitario, tipoDeEjercitario, duracion, nivel
            , competencia, categoria, sector, instruccionPrincipalEjercitario, instruccionesParticipantes, variaciones);
          if (res) {
            this.form.patchValue({
              nombreDeEjercitario: nombreDeEjercitario,
              categoria: categoria,
              tipoDeEjercitario: tipoDeEjercitario,
              duracion: duracion,
              sector: sector,
              nivel: nivel,
              competencia: competencia['id'],
              instruccionPrincipalEjercitario: instruccionPrincipalEjercitario,
              instruccionesParticipantes: instruccionesParticipantes,
              variaciones: variaciones,

            });
          }
        });

  }

  public onSubmit() {
    this.markTouchForm();
    if (this.form.valid) {
      this.display = false;
      this.loader = true;
      this.msg = [];
      const id = this.id;
      const data = { id, ...this.form.value };
      console.warn(data);
      if (this.id && this.id != 0) {
        let sub = this.ejercitarioService.editarEjercitario(data)
          .subscribe(response => {
            console.log(response);
            Swal.fire({
              icon: 'success', title: 'Se actualizo correctamente', showConfirmButton: true,
            });
          });
        this._subscriptions.push(sub);
      } else {
        let sub = this.ejercitarioService.registroEjercitario({ file: this.archivo, ...this.form.value })
          .subscribe(response => {
             Swal.fire({
              icon: 'success', title: 'Se registro correctamente', showConfirmButton: true,
            });
            console.log(response)
          })
      }

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
