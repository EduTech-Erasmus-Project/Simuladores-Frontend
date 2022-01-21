import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { Escenario } from 'src/app/model/Escenario';
import { Usuario } from 'src/app/model/Usuario';
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


  private  escenario :  Escenario = new Escenario();
  private listafiltroParaBuscar : ['tiempo', 'nota'];
  private listaGenero: [];
  private listaDiscapacidad: [];

  barData: any;
  options: any;

  tipoEscenario: string = "Diálogo";
  nombreEscenario: string = "La venta";
  instruccionPrincipalEscenario: string = "Se le pide al participante que visite a un cliente y lo convenza de asistir a una feria.";
  principalesCompetenciasEscenario: string = "Comunicación efectiva"; 
  duracionEscenario: number = 15.00; 
  linkEscenario: string = 'https://www.youtube.com/embed/WxzcD04rwc8';



  selectedState: any = {name: 'Notas', value: 'Notas'};
  selectedEjercitario: any = {name: 'Ejercitario 1', value: 'ejercitario1'};
  public generos: Array<string>
  public discapacidades: Array<any>
  ejercitarios: any[] = [
    {name: 'Ejercitario 1', value: 'ejercitario1'},
    {name: 'Ejercitario 2', value: 'ejercitario2'},
    {name: 'Ejercitario 3', value: 'ejercitario3'},
    {name: 'Ejercitario 4', value: 'ejercitario4'},
    {name: 'Ejercitario 5', value: 'ejercitario5'},
    {name: 'Ejercitario 6', value: 'ejercitario6'},
    {name: 'Ejercitario 7', value: 'ejercitario7'},
  ];

  states: any[] = [
      {name: 'Notas', value: 'Notas'},
      {name: 'Tiempo', value: 'Tiempo'}
  ];
  public datosParaGraficaInicialDiscapacidadVsNota = [] 
  public mujerLista = [];
  public hombreLista = [];
  public lgbtLista = [];
  public otrosLista = [];


  constructor( public servicioSeleccionarEjercitario : PaginaInicioExpertoService,
               public servicioConsultasLabelsGrafica: ConsultasParaGraficasService) {

  }

  
  async ngOnInit() {
    this.listarLabelsTipoDeDiscacidad();
    await this.listarLabelsTipoDeGenero();
    await this.seccionarListas();
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
                  min: 0,
                  max: 100,
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
                data: [10.00, 1.00, 12.00, 10.00, 6.00]
            },
            {
              label: 'Hombres',
              backgroundColor: 'rgb(149, 225, 102)',
              borderColor: 'rgb(149, 225, 102)',
              data: [5.00, 6.00, 7.00, 5.00, 4.00]
            },
            {
              label: 'Otros',
              backgroundColor: 'rgb(66, 201, 225)',
              borderColor: 'rgb(149, 225, 102)',
              data: [5.00, 2.00, 12.00, 10.00, 5.00]
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

  seccionarListas(){
    this.datosParaGraficaInicialDiscapacidadVsNota.forEach(informacion => {
      console.log("**********+++++++++"+informacion)        
    });
    
  }
  

  seleccionEscenario(): void{
    console.log(this.selectedEjercitario.value);

    this.escenario = this.servicioSeleccionarEjercitario.recuperarInformacionDeEscenario(this.selectedEjercitario.value);
    
    this.tipoEscenario= this.escenario.getTipoDeEjercitario;
    this.nombreEscenario= this.escenario.getNombreDeEjercitario;
    this.instruccionPrincipalEscenario= this.escenario.getInstruccionPrincipalDeEjercitario;
    this.principalesCompetenciasEscenario= this.escenario.getPrincipalCompetenciasEjercitario; 
    this.duracionEscenario = this.escenario.getDuracionEjercitarioPorMinutos; 
    this.linkEscenario = this.escenario.getUrlEjercitarios;

  }

  abrirReporte(){
    window.location.href=("http://localhost:4200/#/Pagina-Principal-Experto/escenarioInfo");
    //window.location.href=(this.linkEscenario);
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
    
    this.servicioConsultasLabelsGrafica.recuperarListaDeGenero("martinbojorque@gmail.com").subscribe(
      genero => {
        this.generos = genero.participanteGenero as Array<string>
        this.crearGraficaInicioExperto()
        console.log("*******"+this.generos)
      }
    );
  }

  crearGraficaInicioExperto(){
    
    var discapacidadFisica: number = 0;
    var discapacidadIntelectual: number = 0;
    var discapacidadVisual: number = 0;
    var discapacidadAuditiva: number = 0;
    var discapacidadOtros: number = 0;

    
    
    var valoresJSON = []
    this.generos.forEach(genero => {
      this.servicioSeleccionarEjercitario.crearGraficaPaginaInicio("martinbojorque@gmail.com").subscribe(
        datosParaGrafica => { 

          datosParaGrafica.participantes.forEach(informacionParticipante => {
            if (genero == informacionParticipante.participanteGenero){
              
              if(('Fisica' == informacionParticipante.tipoDiscapacidad)){
                discapacidadFisica = discapacidadFisica + informacionParticipante.calificaciones[0].calificacion;
              }

              if(('Intelectual' == informacionParticipante.tipoDiscapacidad)){
                discapacidadIntelectual = discapacidadIntelectual + informacionParticipante.calificaciones[0].calificacion;
              }
              
              if(('Visual' == informacionParticipante.tipoDiscapacidad)){
                discapacidadVisual = discapacidadVisual + informacionParticipante.calificaciones[0].calificacion;
              }

              if(('Auditiva' == informacionParticipante.tipoDiscapacidad)){
                discapacidadAuditiva = discapacidadAuditiva + informacionParticipante.calificaciones[0].calificacion;
              }
              if(('Otros' == informacionParticipante.tipoDiscapacidad)){
                discapacidadOtros = discapacidadOtros + informacionParticipante.calificaciones[0].calificacion;
              }                  
            }  
          });

          if(genero == 'Mujeres'){
            this.mujerLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
          }

          if(genero == 'Hombres'){
            this.hombreLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
          }
          
          if(genero == 'LGBT'){
            this.lgbtLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]            
          }

          if(genero == 'Otros'){
            this.otrosLista = [discapacidadVisual, discapacidadIntelectual, discapacidadFisica, discapacidadAuditiva, discapacidadOtros]
          }

          discapacidadFisica= 0;
          discapacidadIntelectual= 0;
          discapacidadVisual= 0;
          discapacidadAuditiva= 0;
          discapacidadOtros= 0;
          
        }
                
      ); 
    });  
    
    
  }

  
}
