import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpertoService } from 'src/app/service/experto.service';

@Component({
  selector: 'app-lista-experto-por-aprobar',
  templateUrl: './lista-experto-por-aprobar.component.html',
  styleUrls: ['./lista-experto-por-aprobar.component.scss']
})
export class ListaExpertoPorAprobarComponent implements OnInit {

  public  loadingExpertosPendientes= false;
  public  expertoPen : any;
  private  _subscriptions : Subscription[]=[];

  constructor(private expertoService : ExpertoService ) { }

  ngOnInit(): void {
    this.loadParticipantes()
  }
  private async loadParticipantes() {
    this.loadingExpertosPendientes = true;
    try {
      const expertoPendiente = await this.expertoService.obtenerExpertosPendientes().toPromise();
      console.log("Componente",  expertoPendiente);
      this.expertoPen = expertoPendiente;
      this.loadingExpertosPendientes = false;
      this._subscriptions.push( expertoPendiente);
    } catch (error) {
      console.log(error);
    }
  }

  public async validarAprobacion(id){
    console.log(id);

  }
}
