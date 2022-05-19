import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Comentario } from 'src/app/core/interfaces/Comentario';
import { User } from 'src/app/core/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';
import { ComentarioService } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() idActividad?: number;
  @Input() evaluador?:boolean = true;

  public comentario: string = "";
  public loadingPublicar: boolean = false;
  public loader: boolean = false;

  public comentarios: Comentario[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log("idActividad", this.idActividad);
    this.loadData();
  }

  get user(): User {
    return this.authService.user;
  }

  private async loadData() {
    let sub = await this.comentarioService
      .comentarios(this.idActividad)
      .subscribe((result) => {
        this.comentarios = result;
        //sub.unsubscribe();
        console.log("comentarios", result);
      });
  }

  date(date) {
    moment.locale("es");
    return moment(date).calendar();
  }

  comentar() {
    this.loadingPublicar = true;
    let comentarioObj: Comentario = {
      comentario: this.comentario,
      actividad: this.idActividad,
    };
    this.comentarioService.comentar(comentarioObj).subscribe((result) => {
      console.log(result);
      this.loadData();
      this.loadingPublicar = true;
      this.comentario = "";
    }, (error) => {
      console.log(error);
      this.loadingPublicar = true;
    });
  }

}
