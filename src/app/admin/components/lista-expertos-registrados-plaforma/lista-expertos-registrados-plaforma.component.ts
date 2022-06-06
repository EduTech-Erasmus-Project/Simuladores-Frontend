import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpertoService } from 'src/app/service/experto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-expertos-registrados-plaforma',
  templateUrl: './lista-expertos-registrados-plaforma.component.html',
  styleUrls: ['./lista-expertos-registrados-plaforma.component.scss']
})
export class ListaExpertosRegistradosPlaformaComponent implements OnInit {

  public  loadingExpertosAprobado= false;
  public  expertoApro: any;
  

  private  _subscriptions : Subscription[]=[];
  public displayMaximizable: boolean = false;
  public idUsuario: number;
  public usuario:any;
  public estado:boolean = false;
 
  constructor(private expertoService : ExpertoService) { }

  ngOnInit(): void {
    this.loadParticipantes()
    this.expertoService.event.subscribe(result =>{console.log("hola",result);this.loadParticipantes()})
   
  }
 
  
  private async loadParticipantes() {
    this.loadingExpertosAprobado = true;
    try {
      
      const expertoAprobado = await this.expertoService.obtenerExpertosAprobados().toPromise();
      console.log("Componente",  expertoAprobado);
      this.expertoApro = expertoAprobado;
      console.log(this.expertoApro.estado)
      this.loadingExpertosAprobado = false;
      this._subscriptions.push(expertoAprobado);
      
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

 public async bloquarCuenta(id){
   this.estado= true;
   
  
  await this.expertoService.bloqueoCuentaEvaluador(id).subscribe(result => { this.expertoService.emitEvent(true);
    Swal.fire({ icon: 'success', title: 'La cuenta del evaluador a sido bloqueada', showConfirmButton: true, })
    
  }, error => {
    console.log(error);
    Swal.showValidationMessage( `Request failed: Error inesperado`)
  })

  }
}
