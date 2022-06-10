import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public usuario:any;
  public displayMaximizable: boolean;

  constructor(private ejercitarioService : EjercitarioService, private router:Router) { }

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
  public async showModal(usuario1) {
    this.usuario =usuario1
    try {
      console.log(this.usuario);
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }

}
editarEjercitario(id){
  this.router.navigate(['dashboard/nuevo-ejercitario', id]);
}
}

