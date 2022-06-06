import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetenciaService } from "src/app/service/competencia.service";
import { DiscapacidadesService } from 'src/app/service/discapacidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principales-discapacidades',
  templateUrl: './principales-discapacidades.component.html',
  styleUrls: ['./principales-discapacidades.component.scss']
})
export class PrincipalesDiscapacidadesComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public loadingDiscapacidades = false;
  public discapacidad : any;
  private titulo!: string;
  private descripcion!: string;
  public display= false;


  constructor(private discapacidadesService: DiscapacidadesService) { }

  ngOnInit(): void {
    
    this.loadDiscapacidades()
    this.discapacidadesService.event.subscribe(result =>{console.log("hola",result);this.loadDiscapacidades()})
  }

  private async loadDiscapacidades() {
    this.loadingDiscapacidades = true;
    try {
      const discapacidades = await this.discapacidadesService.listaDiscapacidad().toPromise();
      console.log("Componente",  discapacidades);
      this.discapacidad = discapacidades;
      this.loadingDiscapacidades = false;
      //this._subscriptions.push( discapacidades);
    } catch (error) {
      console.log(error);
    }
  }

  async approved(){
    
    let data = {
     tipoDiscapacidad:this.titulo,
     descripcion:this.descripcion
    }
     await this.discapacidadesService.registrarDiscapacidad(data).subscribe(result => { this.discapacidadesService.emitEvent(true);
      this.display=false;
      this.titulo="";
      this.descripcion="";
     Swal.fire({ icon: 'success', title: 'Se ah registrado correctamente', showConfirmButton: true, })
      
    }, error => {
     console.log(error);
     Swal.showValidationMessage( `Request failed: Error inesperado`)
     })
    
  }
}
