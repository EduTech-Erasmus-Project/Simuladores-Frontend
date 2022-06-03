import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetenciaService } from "src/app/service/competencia.service";
import { DiscapacidadesService } from 'src/app/service/discapacidades.service';

@Component({
  selector: 'app-principales-discapacidades',
  templateUrl: './principales-discapacidades.component.html',
  styleUrls: ['./principales-discapacidades.component.scss']
})
export class PrincipalesDiscapacidadesComponent implements OnInit {
private _subscriptions: Subscription[] = [];
  public loadingDiscapacidades = false;
  public discapacidad : any;

  constructor(private discapacidadesService: DiscapacidadesService) { }

  ngOnInit(): void {
  
  this.loadDiscapacidades();

}

private async loadDiscapacidades() {
  this.loadingDiscapacidades = true;
  try {
    const discapacidades = await this.discapacidadesService.obtenerListaDiscapacidades().toPromise();
    console.log("Componente",  discapacidades);
    this.discapacidad = discapacidades;
    this.loadingDiscapacidades = false;
    this._subscriptions.push( discapacidades);
  } catch (error) {
    console.log(error);
  }
}}
