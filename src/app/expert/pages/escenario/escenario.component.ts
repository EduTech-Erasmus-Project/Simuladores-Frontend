import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/interfaces/User';
import { Representative } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { AuthService } from 'src/app/service/auth.service';
import { ConsultasParaGraficasService } from 'src/app/service/consultaGraficas/consultas-para-graficas.service';
import { DiscapacidadesService } from 'src/app/service/discapacidades.service';
import { InfoExpertoPorEscenarioService } from 'src/app/service/paginaExpertoPorEscenario/info-experto-por-escenario.service';
import { PaginaInicioExpertoService } from 'src/app/service/paginaInicioExperto/pagina-inicio-experto.service';

@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.component.html',
  styleUrls: ['./escenario.component.css']
})
export class EscenarioComponent implements OnInit {

  private listaDiscapacidad : [];
  private listaGenero: [];
  private listaParaFiltroGrafica1: ['Tiempo', 'Nota'];
  private listaParaFiltroGrafica2: [''];

  private discapacidad : String;
  private genero: String;
  private evaluador: String;
  private escenario: String;
  

  public generos: Array<string>
  public discapacidades: Array<any>

  public discacidadFisicaPuntosNota: number = 0;
  public discacidadFisicaPuntosTiempo: number = 0;

  public discacidadVisualPuntosNota: number = 0;
  public discacidadVisualPuntosTiempo: number = 0;

  public discacidadAuditivaPuntosNota: number = 0;
  public discacidadAuditivaPuntosTiempo: number = 0;

  public discacidadIntelectualPuntosNota: number = 0;
  public discacidadIntelectualPuntosTiempo: number = 0;

  public discacidadOtrosPuntosNota: number = 0;
  public discacidadOtrosPuntosTiempo: number = 0;

  public contMujer : number =0;
  public contHombre : number = 0;
  public contLgtb: number = 0;
  public contOtros: number = 0;


  selectedState: any = {name: 'Notas', value: 'Notas'};
  selectedState2: any = {name: 'Notas', value: 'Notas'};
   options: any;

  states: any[] = [
    {name: 'Notas', value: 'Notas'},
    {name: 'Tiempo', value: 'Tiempo'}
  ];

  states2: any[] = [
    {name: 'Notas', value: 'Notas'},
    {name: 'Tiempo', value: 'Tiempo'}
  ];

  // PARA LA GRAFICA
  lineData: any;

  barData: any;

  pieData: any;
  ///////////////////

  //// PARA LA TABLA 
  public listParticipantesEvaluadorEjercitario: User[];
  //customers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    ///


    public datosParaGraficaInicialDiscapacidadVsNota = [] 
    public mujerLista = [];
    public hombreLista = [];
    public lgbtLista = [];
    public otrosLista = [];
    public mujerListaTiempo = [];
    public hombreListaTiempo = [];
    public lgbtListaTiempo = [];
    public otrosListaTiempo = [];
    public listaTodasLasNotas = [];
    public listaTodosLosTiempos = [];
    private correoResponsableDatos: string;
    private ejercitario: number;

  constructor(/**PARA LA TABLA */private customerService: CustomerService,
              public servicioConsultasLabelsGrafica: ConsultasParaGraficasService,
              public servicioGraficaPorEscenario: InfoExpertoPorEscenarioService,
              public servicioSeleccionarEjercitario : PaginaInicioExpertoService,
              private discapacidadesService : DiscapacidadesService,
              private _Activatedroute:ActivatedRoute, private autentificacionUsuario: AuthService) { }



  async ngOnInit() {
    try {
      
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

      this.ejercitario = Number(this._Activatedroute.snapshot.paramMap.get("idEjercitario"));
    } catch (error) {
      console.log("Ejercitario or correo: "+error)
    }
    
    this.listarLabelsTipoDeDiscacidad();
    this.listarLabelsTipoDeGenero();
    this.seleccionTipoGrafico();
    this.graficaSimplePuntos();
    this.graficaPastel();
    //this.tablaEstudiantes();
    }

  graficaPastel(){
    this.servicioGraficaPorEscenario.graficaPastelGeneroPorEjercitario(this.correoResponsableDatos, this.ejercitario).then(
      generosCont=> {
        this.pieData = {
          labels: ['Hombre', 'Mujer', 'LGTB', 'OTROS'],
          datasets: [
              {
                  data: [generosCont[0], generosCont[1], generosCont[2], generosCont[3]],
                  backgroundColor: [
                      'rgb(202, 106, 199)',
                      'rgb(149, 225, 102)',
                      'rgb(66, 201, 225)',
                      'rgb(45, 201, 225)' 
                  ]
              }]
        };
      }
    );
  }

  graficaSimplePuntos():void{

    if(this.selectedState2.name == "Tiempo"){

          
      this.options = {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
              }
          }]
        }
      };


      this.lineData = {
        labels: ['Fisica', 'Visual', 'Intelectual', 'Auditiva', 'Otros'],
        datasets: [
            {
                label: 'Escenario 1',
                data: [this.discacidadFisicaPuntosTiempo, this.discacidadVisualPuntosTiempo, this.discacidadIntelectualPuntosTiempo , this.discacidadAuditivaPuntosTiempo, this.discacidadOtrosPuntosTiempo],
                fill: false,
                backgroundColor: 'rgb(149, 225, 102)',
                borderColor: 'rgb(66, 201, 225)'
            }
        
        ]
    };
    }else  {
      this.lineData = {
        labels: ['Fisica', 'Visual', 'Intelectual', 'Auditiva', 'N/A'],
        datasets: [
            {
                label: 'Escenario 1',
                data: [this.discacidadFisicaPuntosNota, this.discacidadVisualPuntosNota , this.discacidadVisualPuntosNota , this.discacidadIntelectualPuntosTiempo, this.discacidadAuditivaPuntosNota, this.discacidadOtrosPuntosNota],
                fill: false,
                backgroundColor: 'rgb(149, 225, 102)',
                borderColor: 'rgb(66, 201, 225)'
            }
        
        ]
    };

    }
   

  }



  seleccionTipoGrafico():void {
    
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

  


  // tablaEstudiantes(): void {
  //   ///// PARA LA TABLA 
    
  //   this.servicioGraficaPorEscenario.recuperarEstudiantesEjercitarioResponsable(this.ejercitario)
  //   .then(res =>{
  //     this.listParticipantesEvaluadorEjercitario = res;
  //     this.listParticipantesEvaluadorEjercitario.forEach(participante => {
  //       this.servicioGraficaPorEscenario.recuperarNotasPorEjercitario(this.correoResponsableDatos, this.ejercitario, participante.email)
  //       .then((res:any) => {
  //         participante.calificacion = res.notas[0].calificacion
  //         participante.tiempo = res.notas[0].tiempo
          
  //       });
  //     });
      
  //     this.loading = false;
      
  //   });
  //   }

  // METODO DE TABLA 

  clear(table: Table) {
    table.clear();
  }

  // PARA SELECT DE GRAFICA tIPO DE DISCAPACIDAD GENERAL 
  seleccionGrafica1: any = {name: 'Notas', value: 'Notas'};

  opciones: any[] = [
      {name: 'Nota', code: 'Nota'},
      {name: 'Tiempo', value: 'Tiempo'}
  ];

  ///llamadas a servicios
    
  async listarLabelsTipoDeDiscacidad(){
    await this.discapacidadesService.obtenerDiscapacidades().subscribe(
      dispapacidades => {
          this.discapacidades = []
          dispapacidades.discapacidades.forEach(discapacidad => {
            this.discapacidades.push(discapacidad.tipoDiscapacidad)            
          });
      }
    );
  }

  listarLabelsTipoDeGenero(){
    
    // this.servicioConsultasLabelsGrafica.recuperarListaDeGenero().subscribe(
    //   genero => {
    //     this.generos = genero.participanteGenero as Array<string>
    //     this.crearGraficaInicioExperto()
    //   }
    // );
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
      this.servicioGraficaPorEscenario.crearGraficaTipoDiscapacidadVsNotaVsTiempo(this.correoResponsableDatos, this.ejercitario).subscribe(
        datosParaGrafica => { 

          datosParaGrafica.participantes.forEach(informacionParticipante => {
            if (genero == informacionParticipante.participanteGenero){
              
              if(('Fisica' == informacionParticipante.tipoDiscapacidad)){
                discapacidadFisica = discapacidadFisica + informacionParticipante.calificaciones[0].calificacion;
                discapacidadFisicaTiempo = discapacidadFisicaTiempo + informacionParticipante.calificaciones[0].tiempo;
                
                this.discacidadFisicaPuntosNota = this.discacidadFisicaPuntosNota + discapacidadFisica;
                this.discacidadFisicaPuntosTiempo = this.discacidadFisicaPuntosTiempo + discapacidadFisicaTiempo;
              }

              if(('Intelectual' == informacionParticipante.tipoDiscapacidad)){
                discapacidadIntelectual = discapacidadIntelectual + informacionParticipante.calificaciones[0].calificacion;
                discapacidadIntelectualTiempo = discapacidadIntelectualTiempo + informacionParticipante.calificaciones[0].tiempo;
                this.discacidadIntelectualPuntosNota = this.discacidadIntelectualPuntosNota + discapacidadIntelectual;
                this.discacidadIntelectualPuntosTiempo = this.discacidadIntelectualPuntosTiempo + discapacidadIntelectualTiempo;

              }
              
              if(('Visual' == informacionParticipante.tipoDiscapacidad)){
                discapacidadVisual = discapacidadVisual + informacionParticipante.calificaciones[0].calificacion;
                discapacidadVisualTiempo = discapacidadVisualTiempo + informacionParticipante.calificaciones[0].tiempo;
                this.discacidadVisualPuntosNota = this.discacidadVisualPuntosNota + discapacidadVisual;
                this.discacidadVisualPuntosTiempo = this.discacidadVisualPuntosTiempo + discapacidadVisualTiempo;
              
              }

              if(('Auditiva' == informacionParticipante.tipoDiscapacidad)){
                discapacidadAuditiva = discapacidadAuditiva + informacionParticipante.calificaciones[0].calificacion;
                discapacidadAuditivaTiempo = discapacidadAuditivaTiempo + informacionParticipante.calificaciones[0].tiempo;
                this.discacidadAuditivaPuntosNota = this.discacidadAuditivaPuntosNota + discapacidadAuditiva;
                this.discacidadAuditivaPuntosTiempo = this.discacidadAuditivaPuntosTiempo + discapacidadAuditivaTiempo;  
              }

              if(('Otros' == informacionParticipante.tipoDiscapacidad)){
                discapacidadOtros = discapacidadOtros + informacionParticipante.calificaciones[0].calificacion;
                discapacidadOtrosTiempo = discapacidadOtrosTiempo + informacionParticipante.calificaciones[0].tiempo;
                this.discacidadOtrosPuntosNota = this.discacidadOtrosPuntosNota + discapacidadOtros;
                this.discacidadOtrosPuntosTiempo = this.discacidadOtrosPuntosTiempo + discapacidadOtrosTiempo;
              }                  
            }  
          });

          if(genero == 'Mujeres'){
            this.mujerLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
            this.mujerListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
            this.contMujer = this.contMujer + 1
          }

          if(genero == 'Hombres'){
            this.hombreLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
            this.hombreListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
            this.contHombre = this.contHombre+1
          }
          
          if(genero == 'LGBT'){
            this.lgbtLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]            
            this.lgbtListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
            this.contLgtb = this.contLgtb+1
          }

          if(genero == 'Otros'){
            this.otrosLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
            this.otrosListaTiempo = [discapacidadVisualTiempo, discapacidadIntelectualTiempo, discapacidadFisicaTiempo, discapacidadAuditivaTiempo, discapacidadOtrosTiempo]
            this.contOtros = this.contOtros+1
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

}
