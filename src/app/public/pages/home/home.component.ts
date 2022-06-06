import { Component, OnInit } from "@angular/core";
import { EjercitarioService } from "src/app/service/ejercitario.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  participantes: number = 0;
  evaluadores: number = 0;
  simuladores: number = 0;

  titulo =
    "Simuladores laborales en 3D para favorecer la inserción laboral de estudiantes universitarios con discapacidad";
  descripcion =
    "La construcción y traducción de una pedagogía acorde a la variabilidad en el aprendizaje para fortalecer el desarrollo de competencias profesionales.";
  btnText = "Comenzar";
  imgLink = "assets/img/jeshoots-com-xGtHjC_QNJM-unsplash.jpg";

  constructor(private ejercitarioService: EjercitarioService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let data = await this.ejercitarioService.informacionCount().toPromise();
      this.participantes = data.usuarios;
      this.evaluadores = data.expertos;
      this.simuladores = data.ejercitarios;
    } catch (error) {
      console.log(error);
    }
  }
}
