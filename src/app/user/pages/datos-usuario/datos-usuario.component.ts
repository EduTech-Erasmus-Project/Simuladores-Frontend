import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationService,
  MessageService,
  SelectItemGroup,
} from "primeng/api";
import { User } from "src/app/core/interfaces/User";
import { AuthService } from "src/app/service/auth.service";
import { InformacionEvaluadorService } from "src/app/service/informcionEvaluador/informacion-evaluador.service";
import { InformacionParticipanteService } from "src/app/service/informcionParticpante/informacion-participante.service";

@Component({
  selector: "app-datos-usuario",
  templateUrl: "./datos-usuario.component.html",
  styleUrls: ["./datos-usuario.component.scss"],
})
export class DatosUsuarioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  obtenerInformacionUsuario() {}
}
