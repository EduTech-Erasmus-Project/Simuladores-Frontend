import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EjercitarioService } from 'src/app/service/ejercitario.service';

@Component({
  selector: 'app-lista-ejercitarios',
  templateUrl: './lista-ejercitarios.component.html',
  styleUrls: ['./lista-ejercitarios.component.scss']
})
export class ListaEjercitariosComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingEjercitario = false;
  public ejercitario : any;
  constructor(private ejercitarioService : EjercitarioService) { }

  ngOnInit(): void {

    this.loadEjercitario();

  }


  private async loadEjercitario() {
    this.loadingEjercitario = true;
    try {
      const ejercitarios = await this.ejercitarioService.obtenerListaejercitario().toPromise();
      console.log("Componente",  ejercitarios);
      this.ejercitario = ejercitarios;
      this.loadingEjercitario = false;
      this._subscriptions.push( ejercitarios);
    } catch (error) {
      console.log(error);
    }
  }

}
