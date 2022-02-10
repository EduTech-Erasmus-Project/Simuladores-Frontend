import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipanteAceptacionTabla } from 'src/app/model/Participante';
import { Responsable } from 'src/app/model/Responsable';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';

@Component({
  selector: 'app-agregar-actividades-participante',
  templateUrl: './agregar-actividades-participante.component.html',
  styleUrls: ['./agregar-actividades-participante.component.css']
})
export class AgregarActividadesParticipanteComponent implements OnInit {

  private correoEvaluadorActividades: string = '';
  public responsable: Responsable;
  public responsableSelect: Responsable;
  public listParticipantes: ParticipanteAceptacionTabla[];

  constructor(private _Activatedroute:ActivatedRoute, private responsableServiceInformacion: InformacionEvaluadorService) { }

  ngOnInit(): void {
    this.correoEvaluadorActividades = this._Activatedroute.snapshot.paramMap.get("correo");
    this.obtenerInformacionExperto();
    this.responsableServiceInformacion.obtenerParticipantesEvaluadorCorreo(this.correoEvaluadorActividades).then(listParticipantesAceptados => {
      this.listParticipantes = listParticipantesAceptados
    });

  }

  obtenerInformacionExperto(){
    this.responsableServiceInformacion.obtenerInformacionEvaluadorCorreo(this.correoEvaluadorActividades).then(
      responsable => {
        this.responsable = new Responsable(responsable.id, responsable.email, responsable.nombre, 
          responsable.apellido, responsable.telefono, responsable.pais, responsable.ciudad, 
          responsable.direccion, responsable.estado, responsable.nivelDeFormacion);
      }
    )
  }

  agregarParticipante(email: string, rowIndex: number){
   
    console.log(this.listParticipantes.splice(rowIndex,1)[0]);
//    var rowAgregar = this.listParticipantes.splice(rowIndex,1)[0] as ParticipanteAceptacionTabla;
  //  this.listParticipantes.push(rowAgregar);
    //this.responsableServiceInformacion.agregarParticipante(email);
  }

}
