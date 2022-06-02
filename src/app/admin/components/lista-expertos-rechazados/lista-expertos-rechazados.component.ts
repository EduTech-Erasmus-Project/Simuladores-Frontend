import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpertoService } from 'src/app/service/experto.service';

@Component({
  selector: 'app-lista-expertos-rechazados',
  templateUrl: './lista-expertos-rechazados.component.html',
  styleUrls: ['./lista-expertos-rechazados.component.scss']
})
export class ListaExpertosRechazadosComponent implements OnInit {
  
  public  loadingExpertosRechazados= false;
  public  expertoRech: any;
  private  _subscriptions : Subscription[]=[];
 

  constructor(private expertoService : ExpertoService) { }

  ngOnInit(): void {

    this.loadParticipantes() 
  }

  private async loadParticipantes() {
    this.loadingExpertosRechazados = true;
    try {
      const expertoRechazado = await this.expertoService.obtenerExpertosRechazados().toPromise();
      console.log("Componente",  expertoRechazado);
      this.expertoRech = expertoRechazado;
      this.loadingExpertosRechazados = false;
      this._subscriptions.push( expertoRechazado);
    } catch (error) {
      console.log(error);
    }
  }

}
