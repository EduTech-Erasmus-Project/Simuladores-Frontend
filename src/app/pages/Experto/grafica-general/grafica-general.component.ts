import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CategoriesAverage } from 'src/app/pages/Experto/dashboard-settings/categories-average';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let Solid = require('highcharts/modules/solid-gauge');
let Exporting = require('highcharts/modules/exporting')



Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
Solid(Highcharts);
Exporting(Highcharts);



@Component({
  selector: 'app-grafica-general',
  templateUrl: './grafica-general.component.html',
  styleUrls: ['./grafica-general.component.css']
})
export class GraficaGeneralComponent implements OnInit {

  private subtitleChart: string = 'Fuente: Observatorio UPS';
  private categoriesAverage: CategoriesAverage = new CategoriesAverage(this.subtitleChart);
  private categoriesComplianceChart: Highcharts.Chart;
 // private categoriesCompliance: CategoriesCompliance = new CategoriesCompliance(this.subtitleChart);
 private categoriesAverageChart: Highcharts.Chart;
  private countryCategoriesAverageChart: Highcharts.Chart;
 
  constructor() { }

  

  ngOnInit(): void {
    try {

     // this.categoriesComplianceChart = Highcharts.chart('categories-compliance', this.categoriesComplianceChart.);
      //this.countryCategoriesAverageChart = Highcharts.chart('country-categories-average', this.countryCategoriesAverage.getOptions());
     this.categoriesAverageChart = Highcharts.chart('categories-average', this.categoriesAverage.getOptions());

     // this.pagesComplianceChart = Highcharts.chart('pages-compliance', this.pagesCompliance.getOptions());
     // this.pagesAverageChart = Highcharts.chart('pages-average', this.pagesAverage.getOptions());
     // this.pageComplianceChart = Highcharts.chart('page-compliance', this.pageCompliance.getOptions());

     // await this.loadSeries();
     // this.updateAllCharts();

    } catch (error) {
      console.log(error);
    }

  }

  async loadSeries(): Promise<void> {
  }
}
