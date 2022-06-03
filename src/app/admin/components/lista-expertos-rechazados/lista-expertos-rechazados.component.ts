import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpertoService } from 'src/app/service/experto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-expertos-rechazados',
  templateUrl: './lista-expertos-rechazados.component.html',
  styleUrls: ['./lista-expertos-rechazados.component.scss']
})
export class ListaExpertosRechazadosComponent implements OnInit {
  
  public  loadingExpertosRechazados= false;
  public  expertoRech: any;
  private  _subscriptions : Subscription[]=[];
 

  constructor(private expertoService : ExpertoService) { }

  ngOnInit(): void {

    this.loadParticipantes()
    this.expertoService.event.subscribe(result =>{console.log("hola",result);this.loadParticipantes()})
  }

  private async loadParticipantes() {
    this.loadingExpertosRechazados = true;
    try {
      const expertoRechazado = await this.expertoService.obtenerExpertosRechazados().toPromise();
      console.log("Componente",  expertoRechazado);
      this.expertoRech = expertoRechazado;
      this.loadingExpertosRechazados = false;
      this._subscriptions.push( expertoRechazado);
     
    } catch (error) {
      console.log(error);
    }
  }

  async approved(id,idU){
    console.log(id,idU);
    let data = {
      idU:idU,
      idE: id,
      estado: true,
      razon: null
    }
    await this.expertoService.aprobarEvaluador(data).subscribe(result => { this.expertoService.emitEvent(true);
      Swal.fire({ icon: 'success', title: 'Se ah aprovado al Experto', showConfirmButton: true, })
      
    }, error => {
      console.log(error);
      Swal.showValidationMessage( `Request failed: Error inesperado`)
    })
    
  }

}
