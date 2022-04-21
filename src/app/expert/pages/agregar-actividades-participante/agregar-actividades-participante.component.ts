import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignacionTabla } from 'src/app/model/Asignacion';
import { ParticipanteAceptacionTabla } from 'src/app/model/Participante';
import { Responsable } from 'src/app/model/Responsable';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';

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
  public listParticipanteAsignaciones: AsignacionTabla[];
  public emailParticipanteSeleccion: string = '';
  public fechaActividad: Date = new Date();
  isFormValid = false;
  informacion = '';

  invalidDates: Array<Date> = []
  ejercitarios: any[] = [
    { name: 'La venta', value: '1' },
    { name: 'Empleado problema', value: '2' },
    { name: 'Mi agenda', value: '3' },
    { name: 'Funciones y competencias', value: '4' },
    { name: 'El tiempo', value: '5' },
    { name: 'Un día de trabajo', value: '6' },
    { name: 'La tecnología prima', value: '7' },
    { name: 'Construcción', value: '8' },
    { name: 'Construcción de Logo', value: '10' },
  ];
  selectedEjercitario: any = { name: 'Ejercitario 1', value: 'ejercitario1' };

  constructor(private _Activatedroute: ActivatedRoute, private responsableServiceInformacion: InformacionEvaluadorService,
    private autentificacionUsuario: AutentificacionUsuarioService, private informacionParticipante: InformacionParticipanteService) {

  }

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("correo") != null) {
      if (this._Activatedroute.snapshot.paramMap.get("correo") == this.autentificacionUsuario.emailUser) {
        this.correoEvaluadorActividades = this._Activatedroute.snapshot.paramMap.get("correo")
      } else {
        this.autentificacionUsuario.logout();
      }
    } else if (this.autentificacionUsuario.emailUser != null) {
      this.correoEvaluadorActividades = this.autentificacionUsuario.emailUser;
    } else {
      this.correoEvaluadorActividades = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }

    this.obtenerInformacionExperto();
    this.responsableServiceInformacion.obtenerParticipantesEvaluadorCorreo(this.correoEvaluadorActividades).then(listParticipantesAceptados => {
      this.listParticipantes = listParticipantesAceptados
    });

    let today = new Date();

    for (let index = 0; index < 33; index++) {
      let invalidDate = new Date();
      invalidDate.setDate(today.getDate() - index);
      this.invalidDates.push(invalidDate);
    }
  }

  obtenerInformacionExperto() {
    this.responsableServiceInformacion.obtenerInformacionEvaluadorCorreo(this.correoEvaluadorActividades).then(
      responsable => {
        this.responsable = new Responsable(responsable.id, responsable.email, responsable.nombre,
          responsable.apellido, responsable.telefono, responsable.pais, responsable.ciudad,
          responsable.direccion, responsable.estado, responsable.nivelDeFormacion);
      }
    )
  }

  seleccionarParticipante(email: string, rowIndex: number) {
    this.emailParticipanteSeleccion = email;
    this.informacionParticipante.obtenerInformacionAsignacionesParticipante(email, this.correoEvaluadorActividades)
      .then(asignaciones => this.listParticipanteAsignaciones = asignaciones);
    

  }

  agregarActividad() {
    //console.log("email: "+this.emailParticipanteSeleccion+" evaluador: "+this.correoEvaluadorActividades+ " fecha: "+this.fechaActividad+" ejercitario: "+this.selectedEjercitario.value )
    this.informacionParticipante.agregarAsignacioneParticipante(
      this.emailParticipanteSeleccion, this.correoEvaluadorActividades,
      this.fechaActividad, this.selectedEjercitario.value).subscribe(res => {
        this.isFormValid = true;
        this.informacion = this.fechaActividad+": Se agrego nueva Actividad al Participante: " + this.emailParticipanteSeleccion + ", desarrollar ejercitario: "+this.selectedEjercitario.name
        var asignacion: AsignacionTabla = {
          idAsignacion: res.idAsignacion,
          fechaAsignacion: res.fechaAsignacion,
          participante: res.participante,
          evaluador: res.evaluador,
          numeroDeEjercitario: res.numeroDeEjercitario,
          nombreDeEjercitario: res.nombreDeEjercitario
        }
        this.listParticipanteAsignaciones.unshift(asignacion)
      });
  }

  eliminarActividad(idActividad: number, rowIndex: number){
    this.listParticipanteAsignaciones.splice(rowIndex,1);
    this.informacionParticipante.eliminarAsignacion(idActividad);
  }

}