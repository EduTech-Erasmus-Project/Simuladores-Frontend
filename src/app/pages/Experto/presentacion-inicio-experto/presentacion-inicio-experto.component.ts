import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { promise } from 'protractor';
import { Escenario, EscenarioInterface, informacionEjercitarioInterface } from 'src/app/model/Escenario';
import { Usuario } from 'src/app/model/Usuario';
import { AutentificacionUsuarioService } from 'src/app/service/autentificacion/autentificacion-usuario.service';
import { ConsultasParaGraficasService } from 'src/app/service/consultaGraficas/consultas-para-graficas.service';
import { PaginaInicioExpertoService } from 'src/app/service/paginaInicioExperto/pagina-inicio-experto.service';

@Component({
  selector: 'app-presentacion-inicio-experto',
  templateUrl: './presentacion-inicio-experto.component.html',
  styleUrls: ['./presentacion-inicio-experto.component.css', 
  '../../../../assets/theme/blue/theme-light.css',
  '../../../../assets/layout/css/blue/layout-light.css'
  ]
})
export class PresentacionInicioExpertoComponent implements OnInit {


  public  escenario :  Escenario = new Escenario();;
  private listafiltroParaBuscar : ['tiempo', 'nota'];
  private listaGenero: [];
  private listaDiscapacidad: [];

  barData: any;
  options: any;

  tipoEscenario: string = "";
  nombreEscenario: string = "";
  instruccionPrincipalEscenario: string = "";
  principalesCompetenciasEscenario: string = ""; 
  duracionEscenario: number = 0; 
  linkEscenario: string = '';



  selectedState: any = {name: 'Notas', value: 'Notas'};
  selectedEjercitario: any = {name: 'Ejercitario 1', value: 'ejercitario1'};
  public generos: Array<string>
  public discapacidades: Array<any>
  ejercitarios: informacionEjercitarioInterface[] = [];

  states: any[] = [
      {name: 'Notas', value: 'Notas'},
      {name: 'Tiempo', value: 'Tiempo'}
  ];
  public datosParaGraficaInicialDiscapacidadVsNota = [] 
  public mujerLista = [];
  public hombreLista = [];
  public lgbtLista = [];
  public otrosLista = [];
  public mujerListaTiempo = [];
  public hombreListaTiempo = [];
  public lgbtListaTiempo = [];
  public otrosListaTiempo = [];
  public correoResponsableDatos: string;

  constructor( public servicioSeleccionarEjercitario : PaginaInicioExpertoService,
               public servicioConsultasLabelsGrafica: ConsultasParaGraficasService, 
               private _Activatedroute:ActivatedRoute, private router: Router, 
               private autentificacionUsuario: AutentificacionUsuarioService) {

  }

  
  async ngOnInit() {
    this.servicioSeleccionarEjercitario.obtenerEjercitarios().then(ejercitariosRep => {
      this.ejercitarios = ejercitariosRep
      
    });

    this.servicioSeleccionarEjercitario.recuperarInformacionDeEscenario(1).then(
      escenario => {
        escenario as EscenarioInterface
        this.escenario = new Escenario();
        this.escenario.setidEjercitario = escenario.idEjercitario;
        this.escenario.setNumeroDeEjercitario = escenario.numeroDeEjercitario;
        this.escenario.setTipoDeEjercitario = escenario.tipoDeEjercitario;
        this.escenario.setNombreDeEjercitario = escenario.nombreDeEjercitario;
        this.escenario.setInstruccionPrincipalEjercitario = escenario.instruccionPrincipalEjercitario;
        this.escenario.setPrincipalCompetenciasEjercitario = escenario.principalCompetenciasEjercitario;
        this.escenario.setDuracionEjercitarioPorMinutos = escenario.duracionEjercitarioPorMinutos;
        this.escenario.setInstruccionesParticipantes = escenario.instruccionesParticipantes;
        this.escenario.setUrlEjercitarios = escenario.urlEjercitarios;
        
      }
    );

    if(this._Activatedroute.snapshot.paramMap.get("correo") != null){
      if(this._Activatedroute.snapshot.paramMap.get("correo") == this.autentificacionUsuario.emailUser){
        this.correoResponsableDatos = this._Activatedroute.snapshot.paramMap.get("correo")
      }else{
        this.autentificacionUsuario.logout();
      }
    }else if(this.autentificacionUsuario.emailUser != null ){
      this.correoResponsableDatos = this.autentificacionUsuario.emailUser;
    }else{
      this.correoResponsableDatos = this.autentificacionUsuario.getcorreoPorToken(this.autentificacionUsuario.getToken);
    }

    this.listarLabelsTipoDeDiscacidad();
    await this.listarLabelsTipoDeGenero();
    
    await this.seleccionTipoGrafico();
     
  }


  seleccionTipoGrafico():void {
    
    console.log("change from the code"+this.selectedState.name);
    if(this.selectedState.name == "Tiempo"){
    
      this.options = {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
              }
          }]
        }
      };

      this.barData = {
        labels: ['Visual', 'Intelectual', 'Física', 'Auditiva', 'Otras'],
        datasets: [
            {
                label: 'Mujeres',
                backgroundColor: 'rgb(202, 106, 199)',
                borderColor: 'rgb(149, 225, 102)',
                data: this.mujerListaTiempo
            },
            {
              label: 'Hombres',
              backgroundColor: 'rgb(149, 225, 102)',
              borderColor: 'rgb(149, 225, 102)',
              data: this.hombreListaTiempo
            },
            {
              label: 'LGBT',
              backgroundColor: 'rgb(66, 201, 225)',
              borderColor: 'rgb(149, 225, 102)',
              data: this.lgbtListaTiempo
            },
            {
              label: 'Otros',
              backgroundColor: 'rgb(66, 201, 225)',
              borderColor: 'rgb(149, 225, 102)',
              data: this.otrosListaTiempo
            }
        ]
      }; 
    }else{
      this.barData = {
        labels: ['Visual', 'Intelectual', 'Física', 'Auditiva', 'Otros'],
        datasets: [
            {
                label: 'Mujeres',
                backgroundColor: 'rgb(202, 106, 199)',
                borderColor: 'rgb(149, 225, 102)',
                data: this.mujerLista
            },
            {
              label: 'Hombres',
              backgroundColor: 'rgb(149, 225, 102)',
              borderColor: 'rgb(149, 225, 102)',
              data: this.hombreLista
            },
            {
              label: 'LGBT',
              backgroundColor: 'rgb(66, 201, 225)',
              borderColor: 'rgb(149, 225, 102)',
              data: this.lgbtLista
            },
            {
              label: 'Otros',
              backgroundColor: 'rgb(66, 201, 225)',
              borderColor: 'rgb(149, 225, 102)',
              data: this.otrosLista
            }
        ]
      }; 
    }
  }

  
  

  seleccionEscenario(): void{
    
    this.servicioSeleccionarEjercitario.recuperarInformacionDeEscenario(this.selectedEjercitario.value).then(
      escenario => {
        escenario as EscenarioInterface
        this.escenario = new Escenario();
        this.escenario.setidEjercitario = escenario.idEjercitario;
        this.escenario.setNumeroDeEjercitario = escenario.numeroDeEjercitario;
        this.escenario.setTipoDeEjercitario = escenario.tipoDeEjercitario;
        this.escenario.setNombreDeEjercitario = escenario.nombreDeEjercitario;
        this.escenario.setInstruccionPrincipalEjercitario = escenario.instruccionPrincipalEjercitario;
        this.escenario.setPrincipalCompetenciasEjercitario = escenario.principalCompetenciasEjercitario;
        this.escenario.setDuracionEjercitarioPorMinutos = escenario.duracionEjercitarioPorMinutos;
        this.escenario.setInstruccionesParticipantes = escenario.instruccionesParticipantes;
        this.escenario.setUrlEjercitarios = escenario.urlEjercitarios;
      }
    );
    
    
  }

  
  listarLabelsTipoDeDiscacidad(){
    this.servicioSeleccionarEjercitario.obtenerDiscapacidades().subscribe(
      dispapacidades => {
          this.discapacidades = []
          dispapacidades.discapacidades.forEach(discapacidad => {
            this.discapacidades.push(discapacidad.tipoDiscapacidad)            
          });
      }
    );
  }

  listarLabelsTipoDeGenero(){
    
    this.servicioConsultasLabelsGrafica.recuperarListaDeGenero(this.correoResponsableDatos).subscribe(
      genero => {
        this.generos = genero.participanteGenero as Array<string>
        this.crearGraficaInicioExperto()
      }
    );
  }

  crearGraficaInicioExperto(){
    
    var discapacidadFisica: number = 0;
    var discapacidadIntelectual: number = 0;
    var discapacidadVisual: number = 0;
    var discapacidadAuditiva: number = 0;
    var discapacidadOtros: number = 0;

    var discapacidadFisicaTiempo: number = 0;
    var discapacidadIntelectualTiempo: number = 0;
    var discapacidadVisualTiempo: number = 0;
    var discapacidadAuditivaTiempo: number = 0;
    var discapacidadOtrosTiempo: number = 0;

    
    
    var valoresJSON = []
    this.generos.forEach(genero => {
      this.servicioSeleccionarEjercitario.crearGraficaPaginaInicio(this.correoResponsableDatos).subscribe(
        datosParaGrafica => { 

          datosParaGrafica.participantes.forEach(informacionParticipante => {
            if (genero == informacionParticipante.participanteGenero){
              
              if(('Fisica' == informacionParticipante.tipoDiscapacidad)){
                
                discapacidadFisica = discapacidadFisica + informacionParticipante.calificaciones[0].calificacion;
                discapacidadFisicaTiempo = discapacidadFisicaTiempo + informacionParticipante.calificaciones[0].tiempo;
                console.log("discapacidadFisicaTiempo: "+discapacidadFisicaTiempo);
              }

              if(('Intelectual' == informacionParticipante.tipoDiscapacidad)){
                discapacidadIntelectual = discapacidadIntelectual + informacionParticipante.calificaciones[0].calificacion;
                discapacidadIntelectualTiempo = discapacidadIntelectualTiempo + informacionParticipante.calificaciones[0].tiempo;
              }
              
              if(('Visual' == informacionParticipante.tipoDiscapacidad)){
                discapacidadVisual = discapacidadVisual + informacionParticipante.calificaciones[0].calificacion;
                discapacidadVisualTiempo = discapacidadVisualTiempo + informacionParticipante.calificaciones[0].tiempo;
              }

              if(('Auditiva' == informacionParticipante.tipoDiscapacidad)){
                discapacidadAuditiva = discapacidadAuditiva + informacionParticipante.calificaciones[0].calificacion;
                discapacidadAuditivaTiempo = discapacidadAuditivaTiempo + informacionParticipante.calificaciones[0].tiempo;
              }
              if(('Otros' == informacionParticipante.tipoDiscapacidad)){
                discapacidadOtros = discapacidadOtros + informacionParticipante.calificaciones[0].calificacion;
                discapacidadOtrosTiempo = discapacidadOtrosTiempo + informacionParticipante.calificaciones[0].tiempo;
              }                  
            }  
          });

          if(genero == 'Mujeres'){
            this.mujerLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
            this.mujerListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
          }

          if(genero == 'Hombres'){
            this.hombreLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
            this.hombreListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
          }
          
          if(genero == 'LGBT'){
            this.lgbtLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]            
            this.lgbtListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
          }

          if(genero == 'Otros'){
            this.otrosLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
            this.otrosListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
          }

          discapacidadFisica= 0;
          discapacidadIntelectual= 0;
          discapacidadVisual= 0;
          discapacidadAuditiva= 0;
          discapacidadOtros= 0;

          

          discapacidadFisicaTiempo= 0;
          discapacidadIntelectualTiempo= 0;
          discapacidadVisualTiempo= 0;
          discapacidadAuditivaTiempo= 0;
          discapacidadOtrosTiempo= 0;
          
        }
                
      ); 
    });  
    
    
  }


  crearGraficaExpertoTiempoGlobal(){

  }

  
}
