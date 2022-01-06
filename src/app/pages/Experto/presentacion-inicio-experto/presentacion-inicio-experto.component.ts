import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-presentacion-inicio-experto',
  templateUrl: './presentacion-inicio-experto.component.html',
  styleUrls: ['./presentacion-inicio-experto.component.css', 
  '../../../../assets/theme/blue/theme-light.css',
  '../../../../assets/layout/css/blue/layout-light.css'
  ]
})
export class PresentacionInicioExpertoComponent implements OnInit {

  barData: any;
  options: any;
  tipoEscenario: string = "Diálogo";
  nombreEscenario: string = "La venta";
  instruccionPrincipalEscenario: string = "Se le pide al participante que visite a un cliente y lo convenza de asistir a una feria.";
  principalesCompetenciasEscenario: string = "Comunicación efectiva"; 
  categoriaEscenario: string = "Interacciones uno a uno";
  duracionEscenario: string = "Usualmente corta, no más de 10 minutos"; 
  variacionesEscenario: string =  "Presentaciones con uso de material audiovisual";
  linkEscenrario: string = 'https://www.youtube.com/embed/WxzcD04rwc8';


  selectedState: any = {name: 'Notas', value: 'Notas'};
  selectedEjercitario: any = {name: 'Ejercitario 1', value: 'ejercitario1'};

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

  constructor() {

  }

  ngOnInit(): void {

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
      labels: ['Visual', 'Intelectual', 'Física', 'Auditiva', 'NA'],
      datasets: [
          {
              label: 'Mujeres',
              backgroundColor: 'rgb(202, 106, 199)',
              borderColor: 'rgb(149, 225, 102)',
              data: [45, 60, 70, 56, 85]
          },
          {
            label: 'Hombres',
            backgroundColor: 'rgb(149, 225, 102)',
            borderColor: 'rgb(149, 225, 102)',
            data: [65, 10, 50, 52, 85]
          },
          {
            label: 'Otros',
            backgroundColor: 'rgb(66, 201, 225)',
            borderColor: 'rgb(149, 225, 102)',
            data: [85, 41, 52, 52, 47]
          }
      ]
    };  
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
        labels: ['Visual', 'Intelectual', 'Física', 'Auditiva', 'NA'],
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
        labels: ['Visual', 'Intelectual', 'Física', 'Auditiva', 'NA'],
        datasets: [
            {
                label: 'Mujeres',
                backgroundColor: 'rgb(202, 106, 199)',
                borderColor: 'rgb(149, 225, 102)',
                data: [45, 60, 70, 56, 85]
            },
            {
              label: 'Hombres',
              backgroundColor: 'rgb(149, 225, 102)',
              borderColor: 'rgb(149, 225, 102)',
              data: [65, 10, 50, 52, 85]
            },
            {
              label: 'Otros',
              backgroundColor: 'rgb(66, 201, 225)',
              borderColor: 'rgb(149, 225, 102)',
              data: [85, 41, 52, 52, 47]
            }
        ]
      }; 
    }
  }
  

  seleccionEscenario(): void{
    console.log(this.selectedEjercitario.value);
    

  }
  
}
