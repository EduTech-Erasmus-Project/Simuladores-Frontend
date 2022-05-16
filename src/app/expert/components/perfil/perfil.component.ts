import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DiscapacidadesService } from 'src/app/service/discapacidades.service';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() id:number;


  public participante: any;
  public discapacidades: any;
  public radarData: any;

  constructor(
    private usuarioService: InformacionParticipanteService,
    private discapacidadesService: DiscapacidadesService,
  ) { }

  ngOnInit(): void {
    console.log(this.id);
    console.log("init modal");
    this.loadData();
  }

  private async loadData() {
    let sub = await forkJoin([
      this.usuarioService.obtenerInformacionUsuario(this.id),
      this.discapacidadesService.obtenerDiscapacidades(),
    ]).subscribe(([usuario, discapacidades]) => {
      this.participante = usuario;
      this.discapacidades = discapacidades.discapacidades.map(
        (dis) => dis.tipoDiscapacidad
      );
      //console.log("discapacidades", this.discapacidades);
      this.loadGrafica();
    });
  }

  loadGrafica() {
    this.radarData = {
      labels: this.discapacidades,
      datasets: [
        {
          label: this.participante.DiscapacidadParticipante.map(
            (dis) => dis.discapacidad.tipoDiscapacidad
          ),
          backgroundColor: "rgba(202, 106, 199,0.8)",
          borderColor: "rgba(66, 201, 225)",
          pointBackgroundColor: "rgb(149, 225, 10)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(149, 225, 102)",
          data: this.participante.DiscapacidadParticipante.map(
            (dis) => dis.gradoDeDiscapacidad
          ),
        },
      ],
    };
  }

}
