import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-lista-usuarios-reg-plat',
  templateUrl: './lista-usuarios-reg-plat.component.html',
  styleUrls: ['./lista-usuarios-reg-plat.component.scss']
})
export class ListaUsuariosRegPlatComponent implements OnInit {

  public loadingUsuarios = false;
  public usuarioApro : any;

  private _subscriptions: Subscription[] = [];
  public displayMaximizable: boolean;
  public idUsuario: number;
  public usuario : any;
  public estado:boolean = false;

  constructor(private usuarioService: UsuarioService  ) {
    
   }

  ngOnInit(): void {

    this.loadParticipantes()
    this.usuarioService.event.subscribe(result =>{console.log("hola",result);this.loadParticipantes()})
   
  }
  private async loadParticipantes() {
    this.loadingUsuarios = true;
    try {
      const usuarioAprobado = await this.usuarioService.obtenerParticipantesUsuario().toPromise();
      console.log("Componente",  usuarioAprobado);
      this.usuarioApro = usuarioAprobado;
      console.log(this.usuarioApro.estado)
      this.loadingUsuarios = false;
      this._subscriptions.push(usuarioAprobado);
    } catch (error) {
      console.log(error);
    } 
  }
  public async showModal(usuario1) {
    this.usuario =usuario1
    try {
      console.log(this.usuario);
      this.displayMaximizable = true;
    } catch (error) {
      console.log(error);
    }

    }
    

}
