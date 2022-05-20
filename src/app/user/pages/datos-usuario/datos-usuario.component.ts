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
  styles: [
    `
      :host ::ng-deep .p-multiselect {
        min-width: 15rem;
      }

      :host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
        min-width: 20rem;
      }

      :host ::ng-deep .multiselect-custom .p-multiselect-label {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }

      :host ::ng-deep .multiselect-custom .country-item.country-item-value {
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: 0.5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);
      }

      :host
        ::ng-deep
        .multiselect-custom
        .country-item.country-item-value
        img.flag {
        width: 17px;
      }

      :host ::ng-deep .multiselect-custom .country-item {
        display: flex;
        align-items: center;
      }

      :host ::ng-deep .multiselect-custom .country-item img.flag {
        width: 18px;
        margin-right: 0.5rem;
      }

      :host ::ng-deep .multiselect-custom .country-placeholder {
        padding: 0.25rem;
      }

      :host ::ng-deep .p-colorpicker {
        width: 2.5em;
      }
    `,
  ],
})
export class DatosUsuarioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  obtenerInformacionUsuario() {}
}
