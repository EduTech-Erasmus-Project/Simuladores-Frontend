import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpertoService } from 'src/app/service/experto.service';

@Component({
  selector: 'app-lista-expertos-registrados-plaforma',
  templateUrl: './lista-expertos-registrados-plaforma.component.html',
  styleUrls: ['./lista-expertos-registrados-plaforma.component.scss']
})
export class ListaExpertosRegistradosPlaformaComponent implements OnInit {

  public  loadingExpertosAprobado= false;
  public  expertoApro: any;
  private  _subscriptions : Subscription[]=[];
  public displayMaximizable: boolean = false;
  public idUsuario: number;
  public usuario:any;
 
  constructor(private expertoService : ExpertoService) { }

  ngOnInit(): void {
    this.loadParticipantes()
    this.expertoService.event.subscribe(result =>{console.log("hola",result)})
  }

  private async loadParticipantes() {
    this.loadingExpertosAprobado = true;
    try {
      
      const expertoAprobado = await this.expertoService.obtenerExpertosAprobados().toPromise();
      console.log("Componente",  expertoAprobado);
      this.expertoApro = expertoAprobado;
      this.loadingExpertosAprobado = false;
      this._subscriptions.push(expertoAprobado);
      this.expertoService.emitEvent(true);
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

}
