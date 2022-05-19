import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/core/interfaces/User';
import { DiscapacidadesService } from 'src/app/service/discapacidades.service';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() usuario: User;
  @Input() discapacidadesData?: any;
  
  public discapacidades: any;
  public radarData: any;

  constructor(
    private discapacidadesService: DiscapacidadesService,
  ) { }

  ngOnInit(): void {
    if(this.discapacidadesData){
      this.loadData()
    }
  }

  private async loadData() {
    let sub = await forkJoin([
      this.discapacidadesService.obtenerDiscapacidades(),
    ]).subscribe(([discapacidades]) => {
      this.discapacidades = discapacidades.discapacidades.map(
        (dis) => dis.tipoDiscapacidad
      );
      this.loadGrafica();
    });
  }

  loadGrafica() {
    this.radarData = {
      labels: this.discapacidades,
      datasets: [
        {
          label: this.discapacidadesData.map(
            (dis) => dis.discapacidad.tipoDiscapacidad
          ),
          backgroundColor: "rgba(202, 106, 199,0.8)",
          borderColor: "rgba(66, 201, 225)",
          pointBackgroundColor: "rgb(149, 225, 10)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(149, 225, 102)",
          data: this.discapacidadesData.map(
            (dis) => dis.gradoDeDiscapacidad
          ),
        },
      ],
    };
  }

}
