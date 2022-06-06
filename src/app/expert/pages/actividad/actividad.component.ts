import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Pregunta } from 'src/app/core/interfaces/Pregunta';
import { User } from 'src/app/core/interfaces/User';
import { Actividad } from 'src/app/model/Actividad';
import { ActividadService } from 'src/app/service/actividad.service';
import { AuthService } from 'src/app/service/auth.service';
import { ComentarioService } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  public comentario: string = "";
  public loadingPublicar: boolean = false;
  public loader: boolean = false;
  public idActividad: number;

  public actividad:any;
  public preguntas:Pregunta[];

  constructor(
    private actividadService: ActividadService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (isNaN(+this.route.snapshot.params.id)) {
      //router.navigate(["/user"]);
      //console.log(this.route.snapshot.params);
    }

    this.idActividad = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    //console.log("idActividad", this.idActividad);
    this.loadData();
  }

  get user(): User {
    return this.authService.user;
  }

  private async loadData() {
    let sub = forkJoin([
      this.actividadService.getActividad(this.idActividad),
      this.actividadService.getCorreccionPreguntas(this.idActividad)
    ]).subscribe(
      ([ actividad, preguntas]) => {
        //console.log("actividad", actividad);
        this.actividad = actividad;
        //console.log(actividad);
        this.preguntas = preguntas;
        //console.log("preguntas", preguntas);
      },
      (err) => {
        console.log(err);
        this.router.navigate(["/expert"]);
      }
    );
    // let sub = await this.comentarioService
    //   .comentarios(this.idActividad)
    //   .subscribe((result) => {
    //     this.comentarios = result;
    //     //sub.unsubscribe();
    //     console.log("comentarios", result);
    //   });
  }

}
