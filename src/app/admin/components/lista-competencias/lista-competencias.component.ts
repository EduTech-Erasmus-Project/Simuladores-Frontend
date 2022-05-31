import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetenciaService } from "src/app/service/competencia.service";


@Component({
  selector: 'app-lista-competencias',
  templateUrl: './lista-competencias.component.html',
  styleUrls: ['./lista-competencias.component.scss']
})
export class ListaCompetenciasComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingCompetencia = false;
  public competencia : any;

  constructor(private competenciaService : CompetenciaService) { }

  ngOnInit(): void {
    
   this.loadParticipantes();
    
  }

  private async loadParticipantes() {
    this.loadingCompetencia = true;
    try {
      const competencias = await this.competenciaService.obtenerListaCompetencias().toPromise();
      console.log("Componente",  competencias);
      this.competencia = competencias;
      this.loadingCompetencia = false;
      this._subscriptions.push( competencias);
    } catch (error) {
      console.log(error);
    }
  }

}
