import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ConsultasParaGraficasService } from 'src/app/service/consultaGraficas/consultas-para-graficas.service';
import { InfoExpertoPorEscenarioService } from 'src/app/service/paginaExpertoPorEscenario/info-experto-por-escenario.service';

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


  // PARA LA GRAFICA
  lineData: any;

  barData: any;

  pieData: any;
  ///////////////////

  //// PARA LA TABLA 
  customers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    ///

  constructor(/**PARA LA TABLA */private customerService: CustomerService,
              public servicioConsultasLabelsGrafica: ConsultasParaGraficasService,
              public servicioGraficaPorEscenario: InfoExpertoPorEscenarioService) { }

  ngOnInit(): void {

    // PARA LA GRAFICA 
    this.lineData = {
      labels: ['0','Fisica', 'Visual', 'Intelectual', 'Auditiva', 'N/A'],
      datasets: [
          {
              label: 'Escenario 1',
              data: [0, 7, 4, 6 , 5, 10],
              fill: false,
              backgroundColor: 'rgb(149, 225, 102)',
              borderColor: 'rgb(66, 201, 225)'
          }
      
      ]
  };

  this.barData = {
      labels: ['Fisica', 'Visual', 'Intelectual', 'Auditiva', 'N/A'],
      datasets: [
          {
              label: 'Hombres',
              backgroundColor: 'rgb(202, 106, 199)',
              borderColor: 'rgb(202, 106, 199)',
              data: [ 11, 14, 10, 14, 10,0]
          },
          {
              label: 'Mujeres',
              backgroundColor: 'rgb(149, 225, 102)',
              borderColor: 'rgb(54, 162, 235)',
              data: [10, 13, 10, 15, 10, 0]
          },
          {
            label: 'Otros',
            backgroundColor: 'rgb(66, 201, 225)',
            borderColor: 'rgb(54, 162, 235)',
            data: [ 10, 14, 11, 12, 11, 0]
        }
      ]
  };

  this.pieData = {
      labels: ['Hombre', 'Mujer', 'Otros'],
      datasets: [
          {
              data: [45, 30, 25],
              backgroundColor: [
                  'rgb(202, 106, 199)',
                  'rgb(149, 225, 102)',
                  'rgb(66, 201, 225)'
              ]
          }]
  };
    ///////////////




    ///// PARA LA TABLA 
    this.customerService.getCustomersMedium().then(customers => {
      this.customers = customers;
      this.loading = false;

     // this.customers.forEach(customer => customer.date = new Date(customer.date));
  });

  this.representatives = [
      {name: "Amy Elsner", image: 'amyelsner.png'},
      {name: "Anna Fali", image: 'annafali.png'},
      {name: "Asiya Javayant", image: 'asiyajavayant.png'},
      {name: "Bernardo Dominic", image: 'bernardodominic.png'},
      {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
      {name: "Ioni Bowcher", image: 'ionibowcher.png'},
      {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
      {name: "Onyama Limba", image: 'onyamalimba.png'},
      {name: "Stephen Shaw", image: 'stephenshaw.png'},
      {name: "Xuxue Feng", image: 'xuxuefeng.png'}
  ];

  this.statuses = [
      {label: 'No calificado', value: 'No calificado'},
      {label: 'Calificado', value: 'Calificado'},
      {label: 'Nuevo', value: 'Nuevo'},
      {label: 'Pendiente', value: 'Pendiente'}
  ]
  /// FIN TABLA
    

  }

  // METODO DE TABLA 

  clear(table: Table) {
    table.clear();
  }

  // PARA SELECT DE GRAFICA tIPO DE DISCAPACIDAD GENERAL 
  seleccionGrafica1: any = null;

  opciones: any[] = [
      {name: 'Nota', code: 'Nota'},
      {name: 'Tiempo', value: 'Tiempo'}
  ];

  ////////

    // PARA SELECT DE GRAFICA tipo discapacidad 2 
    seleccionGrafica2: any = null;

    opciones2: any[] = [
        {name: 'Tiempo total de resolución completa', code: 'tiempoTotal'},
        {name: 'Tiempo solo de respuesta', value: 'tiempoRespuesta'},
        {name: 'Promedio de nota'}
    ];
  
    ////////



    ///llmadas a servicios
    listarLabelsTipoDeDiscacidadPorEscenario(){
    
      this.servicioConsultasLabelsGrafica.recuperarListaDiscapacidadesEscenario();
    }

    listarLabelsTipoDeGenero(){
      this.servicioConsultasLabelsGrafica.recuperarListaGeneroEscenario();
    }

    crearGrafica1(listadoGeneroEscenario: [], listadoDiscapacidadEscenario: [], numEscenario:String){
      this.servicioGraficaPorEscenario.recuperarListadoNotaPorEscenario(listadoGeneroEscenario, listadoDiscapacidadEscenario, numEscenario);
    }

    promedioNota(){
      
    }

    crearGrafica2tiempoCompleto(listaGeneroEscenario: [], listadoDiscapacidadesEscenario: [], numEscenario:String){
      this.servicioGraficaPorEscenario.recuperarListadoTiempoResolucionCompletaPorEscenario(listaGeneroEscenario, listadoDiscapacidadesEscenario, numEscenario);
    }

    crearGrafica2tiempoSoloRespuesta(listaGeneroEscenario: [], listadoDiscapacidadesEscenario: [], numEscenario:String){
      this.servicioGraficaPorEscenario.recuperarListadoTiempoResolucionSoloRespuestaPorEscenario(listaGeneroEscenario, listadoDiscapacidadesEscenario, numEscenario);
    }

    crearGrafica2PromedioNota (listaGeneroEscenario: [], listadoDiscapacidadesEscenario: [], numEscenario:String){

    }


}
