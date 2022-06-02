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
 
  constructor(private expertoService : ExpertoService) { }

  ngOnInit(): void {
    this.loadParticipantes()
  }

  private async loadParticipantes() {
    this.loadingExpertosAprobado = true;
    try {
      const expertoAprobado = await this.expertoService.obtenerExpertosAprobados().toPromise();
      console.log("Componente",  expertoAprobado);
      this.expertoApro = expertoAprobado;
      this.loadingExpertosAprobado = false;
      this._subscriptions.push(expertoAprobado);
    } catch (error) {
      console.log(error);
    }
  }

}
