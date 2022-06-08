import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-lista-usuarios-reg-plat',
  templateUrl: './lista-usuarios-reg-plat.component.html',
  styleUrls: ['./lista-usuarios-reg-plat.component.scss']
})
export class ListaUsuariosRegPlatComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingUsuarios = false;
  public usuario : any;
  public displayMaximizable: boolean;


  constructor(private usuarioService: UsuarioService  ) {
    
   }

  ngOnInit(): void {

    this.loadParticipantes()
  }
  private async loadParticipantes() {
    this.loadingUsuarios = true;
    try {
      const usuarios = await this.usuarioService.obtenerParticipantesUsuario().toPromise();
      console.log("Componente",  usuarios);
      this.usuario = usuarios;
      this.loadingUsuarios = false;
      this._subscriptions.push( usuarios);
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
