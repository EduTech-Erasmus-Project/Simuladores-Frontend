import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { AuthService } from 'src/app/service/auth.service';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';

@Component({
  selector: 'app-agregar-alumno-a-experto',
  templateUrl: './agregar-alumno-a-experto.component.html',
  styleUrls: ['./agregar-alumno-a-experto.component.css']
})
export class AgregarAlumnoAExpertoComponent implements OnInit {

  customers1: Customer[];
  representatives: Representative[];
  statuses: any[];
  selectedCustomers1: Customer[];
  private correoEvaluadorActividades: string = '';
  public responsable: User;
  public listParticipanteAceptacion: User[];
  public listParticipantes: User[];
  
  
  constructor(private _Activatedroute:ActivatedRoute, private responsableServiceInformacion: InformacionEvaluadorService,
    private autentificacionUsuario: AuthService) { 
      
  }
  ngOnInit(): void {
    if(this._Activatedroute.snapshot.paramMap.get("correo") != null){
      if(this._Activatedroute.snapshot.paramMap.get("correo") == this.autentificacionUsuario.emailUser){
        this.correoEvaluadorActividades = this._Activatedroute.snapshot.paramMap.get("correo")
      }else{
        this.autentificacionUsuario.logout();
      }
    }else if(this.autentificacionUsuario.emailUser != null ){
      this.correoEvaluadorActividades = this.autentificacionUsuario.emailUser;
    }else{
      this.correoEvaluadorActividades = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }


    this.obtenerInformacionExperto();
    
    this.responsableServiceInformacion.obtenerParticipantesPorAceptarEvaluadorCorreo(this.correoEvaluadorActividades).then(listParticipantes => {
      this.listParticipanteAceptacion = listParticipantes
     });

     this.responsableServiceInformacion.obtenerParticipantesEvaluadorCorreo(this.correoEvaluadorActividades).then(listParticipantesAceptados => {
      this.listParticipantes = listParticipantesAceptados
     });
    
  }

  obtenerInformacionExperto(){
    this.responsableServiceInformacion.obtenerInformacionEvaluadorCorreo(this.correoEvaluadorActividades).then(
      responsable => {
        this.responsable = responsable;
      }
    )
  }

  agregarParticipante(email: string, rowIndex: number){
   
    var rowAgregar = this.listParticipanteAceptacion.splice(rowIndex,1)[0] as User;
    this.listParticipantes.push(rowAgregar);
    this.responsableServiceInformacion.agregarParticipante(email);
  }

  eliminarParticipante(email: string, rowIndex: number){
    
    this.listParticipanteAceptacion.splice(rowIndex,1);
    this.responsableServiceInformacion.eliminarParticipante(email);
    
  }

  eliminarParticipanteAceptado(email: string, rowIndex: number){
    console.log("eliminar: "+email);
    this.listParticipantes.splice(rowIndex,1);
    this.responsableServiceInformacion.eliminarParticipante(email);
    
  }

}
