import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { PhotoService } from 'src/app/demo/service/photoservice';
import { Asignacion } from 'src/app/model/Asignacion';
import { Escenario } from 'src/app/model/Escenario';
import { EjercitarioParticipanteService } from 'src/app/service/ejercitarioParticipante/ejercitario-participante.service';

@Component({
  selector: 'app-presentacion-inicio-user',
  templateUrl: './presentacion-inicio-user.component.html',
  styles: [
  ]
})
export class PresentacionInicioUserComponent implements OnInit {

  public correoParticanteInicio: string = '';
  public images: any[];
  public listadoAsignaciones: Array<Asignacion> = [];
  public listadoEjercitarios: Array<any>;
  
  constructor(private router: Router, private ejercitarioService: EjercitarioParticipanteService, private _Activatedroute:ActivatedRoute, private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, private photoService: PhotoService) {
    
  }

  ngOnInit():void {
    this.photoService.getImages().then(images => {
      this.images = images;
    });

    this.correoParticanteInicio=this._Activatedroute.snapshot.paramMap.get("correo");
    this.obtenercionAsignacionesEjercitario();
  }
  
  obtenercionAsignacionesEjercitario(){
      this.ejercitarioService.obtenerAsignacionesEjercitario(this.correoParticanteInicio).subscribe(
        asignaciones => {this.setListadoAsignaciones(asignaciones.asignaciones)}
      )
  }

  setListadoAsignaciones(asignaciones: Array<any>){
    
    var asignacionesLista: Array<Asignacion> = [];
    var asiganacionAUX: Asignacion; 
    var escenario : Escenario;
    
    
    asignaciones.forEach(asignacion => {
      

      this.ejercitarioService.obtenerEjercitario(asignacion.ejercitario_id).subscribe(
        
        ejercitario => {
        
        escenario = new Escenario();
        escenario.setidEjercitario = ejercitario.idEjercitario;
        escenario.setNumeroDeEjercitario = ejercitario.numeroDeEjercitario;
        escenario.setTipoDeEjercitario = ejercitario.tipoDeEjercitario;
        escenario.setNombreDeEjercitario = ejercitario.nombreDeEjercitario;
        escenario.setInstruccionPrincipalEjercitario = ejercitario.instruccionPrincipalEjercitario
        escenario.setPrincipalCompetenciasEjercitario = ejercitario.principalCompetenciasEjercitario;
        escenario.setDuracionEjercitarioPorMinutos = ejercitario.duracionEjercitarioPorMinutos;
        escenario.setInstruccionesParticipantes = ejercitario.instruccionesParticipantes;
        escenario.setUrlEjercitarios = ejercitario.urlEjercitarios;
      
        asiganacionAUX = new Asignacion(asignacion.idAsignacion, asignacion.fechaAsignacion, asignacion.participante_id, asignacion.evaluador_id, escenario);
        asignacionesLista.push(asiganacionAUX);

        }
        
      );
      
      
    });

    this.listadoAsignaciones = asignacionesLista;
    
  }

  realizarEjercitario(urlEjercitario: string, idEjercitario: number){
    console.log("abir ejercitario: "+ idEjercitario+" al participante: "+this.correoParticanteInicio+" url: " +urlEjercitario)
    this.router.navigate([urlEjercitario], { queryParams: { 'correo': this.correoParticanteInicio , 'ejercitario':idEjercitario}});
    //Colocar en esta seccion el direccionamiento hacia los ejercitarios 
  }


}
