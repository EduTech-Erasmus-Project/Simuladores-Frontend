import { Component, OnInit } from "@angular/core";
import { fakeAsync } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { error } from "protractor";
import { Subscriber, Subscription } from "rxjs";
import { Ejercitario } from "src/app/core/interfaces/Ejercitario";
import { EjercitarioService } from "src/app/service/ejercitario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-lista-ejercitarios",
  templateUrl: "./lista-ejercitarios.component.html",
  styleUrls: ["./lista-ejercitarios.component.scss"],
})
export class ListaEjercitariosComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingEjercitario = false;
  public ejercitario: any;
  public usuario: any;

  public calificacion: number = 0;
  public indicador: string = "";

  public displayMaximizable: boolean;
  public display = false;
  public id: any;
  public selectedId: number = 0;
  public editing: boolean = false;
  private ejercitarios: Ejercitario[];

  constructor(
    private ejercitarioService: EjercitarioService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loadEjercitario();
    this.ejercitarioService.event.subscribe((result) => {
      //console.log("hola", result);
      this.loadEjercitario();
    });
  }

  private loadEjercitario() {
    this.loadingEjercitario = true;
    this.ejercitarioService.obtenerListaejercitario().subscribe((res) => {
      this.ejercitario = res;
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
}
