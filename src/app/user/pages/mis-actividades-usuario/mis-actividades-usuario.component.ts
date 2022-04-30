import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { Customer, Representative } from "src/app/demo/domain/customer";
import { CustomerService } from "src/app/demo/service/customerservice";
import { ActivatedRoute } from "@angular/router";
import { InformacionParticipanteService } from "src/app/service/informcionParticpante/informacion-participante.service";
import { InformacionEvaluadorService } from "src/app/service/informcionEvaluador/informacion-evaluador.service";
import { AuthService } from "src/app/service/auth.service";
import { User } from "src/app/core/interfaces/User";
import { Actividad } from "src/app/core/interfaces/actividad";

@Component({
  selector: "app-mis-actividades-usuario",
  templateUrl: "./mis-actividades-usuario.component.html",
  styleUrls: ["./mis-actividades-usuario.component.css"],
  animations: [
    trigger("mask-anim", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      state(
        "visible",
        style({
          opacity: 0.8,
        })
      ),
      transition("* => *", animate("250ms cubic-bezier(0, 0, 0.2, 1)")),
    ]),
  ],
})
export class MisActividadesUsuarioComponent implements OnInit {
  representatives: Representative[];
  customers1: Customer[];
  listActividadesParticpante: Actividad[];
  selectedCustomers1: Actividad[];
  statuses: any[];
  private correoParticanteActividades: string = "";
  public participante: User;

  constructor(
    private autentificacionUsuario: AuthService,
    private evaluadorService: InformacionEvaluadorService,
    private usuarioService: InformacionParticipanteService,
    private _Activatedroute: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("correo") != null) {
      if (
        this._Activatedroute.snapshot.paramMap.get("correo") ==
        this.autentificacionUsuario.emailUser
      ) {
        this.correoParticanteActividades =
          this._Activatedroute.snapshot.paramMap.get("correo");
      } else {
        this.autentificacionUsuario.logout();
      }
    } else if (this.autentificacionUsuario.emailUser != null) {
      this.correoParticanteActividades = this.autentificacionUsuario.emailUser;
    } else {
      this.correoParticanteActividades =
        this.autentificacionUsuario.getcorreoPorToken(
          this.autentificacionUsuario.getToken
        );
    }

    this.obtenerInformacionUsuario();

    this.usuarioService
      .obtenerInformacionActividadesParticipantes(
        this.correoParticanteActividades
      )
      .then((listActividades) => {
        this.listActividadesParticpante = listActividades;
      });

    this.customerService.getCustomersLarge().then((customers) => {
      this.customers1 = customers;
    });
  }

  obtenerInformacionUsuario() {
    this.usuarioService
      .obtenerInformacionUsuario(this.correoParticanteActividades)
      .subscribe((usuario) => {
        this.getInformacionUsuario(usuario);
      });
  }

  getInformacionUsuario(usuario: any) {
    this.participante = usuario;
    var evaluador: User;

    this.evaluadorService
      .obtenerInformacionEvaluador(usuario.responsable)
      .subscribe((responsable) => {
        evaluador = responsable;
        this.participante.responsable = evaluador;
      });
  }

  obtenerActividadesUsuario() {
    this.usuarioService
      .obtenerInformacionActividadesParticipantes(
        this.correoParticanteActividades
      )
      .then((listActividades) => {
        this.listActividadesParticpante = listActividades;
        //this.listActividadesParticpante.forEach(actividad => actividad.date = new Date(actividad.date));
      });
  }

  isMobile() {
    return window.innerWidth <= 991;
  }
}
