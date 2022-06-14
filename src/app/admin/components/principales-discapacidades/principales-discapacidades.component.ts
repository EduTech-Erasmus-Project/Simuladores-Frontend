import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiscapacidadParticipanteInterface } from 'src/app/core/interfaces/DiscapacidadParticipante';
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
  public discapacidad1 : DiscapacidadParticipanteInterface
  private titulo!: string;
  private descripcion!: string;
  
  public nombre11:string;
  public descripcion11: string;
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
  
  private async loadData(id) {
   
    let compSub = await this.discapacidadesService.editarDiscapacidad(id).subscribe((res) => {
        this.discapacidad1 = res;
        this.nombre11 = this.discapacidad1.tipoDiscapacidad;
        this.descripcion11 = this.discapacidad1.descripcion;
        console.log("nombre  ===>   ",this.nombre11 ,"descripcion  ===> ", this.descripcion11)
      });
      
  }
  public async editarDiscapaciodas(id){
  console.log(id)
 
   }
}
