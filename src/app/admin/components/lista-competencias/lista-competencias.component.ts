import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetenciaService } from "src/app/service/competencia.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-competencias',
  templateUrl: './lista-competencias.component.html',
  styleUrls: ['./lista-competencias.component.scss']
})
export class ListaCompetenciasComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingCompetencia = false;
  public competencia : any;
  private titulo!: string;
  private descripcion!: string;
  public display = false;

  constructor(private competenciaService : CompetenciaService) { }

  

  ngOnInit(): void {
    
   this.loadParticipantes();
   this.competenciaService.event.subscribe(result =>{console.log("hola",result);this.loadParticipantes()})
    
  }

  private async loadParticipantes() {
    this.loadingCompetencia = true;
    try {
      const competencias = await this.competenciaService.obtenerListaCompetencias().toPromise();
      console.log("Componente",  competencias);
      this.competencia = competencias;
      this.loadingCompetencia = false;
      this._subscriptions.push( competencias);
    } catch (error) {
      console.log(error);
    }
  }

  async approved(){
    
    let data = {
     titulo:this.titulo,
     descripcion:this.descripcion
    }
     await this.competenciaService.registrarCompetencia(data).subscribe
     (result => { this.competenciaService.emitEvent(true);
      this.display=false;
      this.titulo="";
      this.descripcion="";
Swal.fire({ icon: 'success', title: 'Se registro correctamente', showConfirmButton: true, 
    });
      
    }, error => {
     console.log(error);
     Swal.showValidationMessage( `Request failed: Error inesperado`)
     })
    
  }

}
