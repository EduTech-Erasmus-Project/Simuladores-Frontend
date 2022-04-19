import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { InformacionParticipanteService } from 'src/app/service/informcionParticpante/informacion-participante.service';
import { Responsable } from 'src/app/model/Responsable';
import { InformacionEvaluadorService } from 'src/app/service/informcionEvaluador/informacion-evaluador.service';
import { Participante } from 'src/app/model/Participante';
import { AsignacionTabla } from 'src/app/model/Asignacion';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';
import { ActividadTabla } from 'src/app/model/Actividad';

@Component({
  selector: 'app-mis-actividades-usuario',
  templateUrl: './mis-actividades-usuario.component.html',
  styleUrls: ['./mis-actividades-usuario.component.css'],
  animations: [
    trigger('mask-anim', [
        state('void', style({
            opacity: 0
        })),
        state('visible', style({
            opacity: 0.8
        })),
        transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
  ]
})
export class MisActividadesUsuarioComponent implements OnInit {

  representatives: Representative[];
  customers1: Customer[];
  listActividadesParticpante: ActividadTabla[];
  selectedCustomers1: ActividadTabla[];
  statuses: any[];
  private correoParticanteActividades: string = '';
  public participante: Participante;

  constructor(private autentificacionUsuario: AutentificacionUsuarioService, private evaluadorService: InformacionEvaluadorService, private usuarioService: InformacionParticipanteService , private _Activatedroute:ActivatedRoute, private customerService: CustomerService) { 

    }

  ngOnInit():void {

    if(this._Activatedroute.snapshot.paramMap.get("correo") != null){
      if(this._Activatedroute.snapshot.paramMap.get("correo") == this.autentificacionUsuario.emailUser){
        this.correoParticanteActividades = this._Activatedroute.snapshot.paramMap.get("correo")
      }else{
        this.autentificacionUsuario.logout();
      }
    }else if(this.autentificacionUsuario.emailUser != null ){
      this.correoParticanteActividades = this.autentificacionUsuario.emailUser;
    }else{
      this.correoParticanteActividades = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }

    this.obtenerInformacionUsuario();
    
    this.usuarioService.obtenerInformacionActividadesParticipantes(this.correoParticanteActividades).then(listActividades => {
      this.listActividadesParticpante = listActividades
     });
    
    
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
    });
  
  
  }

  obtenerInformacionUsuario(){
    this.usuarioService.obtenerInformacionUsuario(this.correoParticanteActividades).subscribe(
      usuario => {this.getInformacionUsuario(usuario)}
    );
  }

  getInformacionUsuario(usuario: any){
    var evaluador: Responsable;
   
    this.evaluadorService.obtenerInformacionEvaluador(usuario.responsable).subscribe(
      responsable => {
        evaluador = new Responsable(
          responsable.id, responsable.email, responsable.nombre, responsable.apellido, responsable.telefono, 
          responsable.pais, responsable.ciudad, responsable.direccion, responsable.estado, responsable.nivelDeFormacion
        );

        this.participante = new Participante(
          usuario.id, usuario.email, usuario.nombre, usuario.apellido, usuario.telefono, 
          usuario.pais, usuario.ciudad, usuario.direccion, usuario.estado, usuario.fechaNacimiento, usuario.carreraUniversitaria,
          usuario.genero, usuario.numeroDeHijos, usuario.estadoCivil, usuario.etnia, usuario.estudiosPrevios, 
          usuario.codigoEstudiante, usuario.nivelDeFormacion, usuario.aceptacionPendianteResponsable, evaluador 
        );

      }
    );
    
  }

  obtenerActividadesUsuario(){
    this.usuarioService.obtenerInformacionActividadesParticipantes(this.correoParticanteActividades).then(listActividades => {
      this.listActividadesParticpante = listActividades;
      //this.listActividadesParticpante.forEach(actividad => actividad.date = new Date(actividad.date));
    });
  
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

}
